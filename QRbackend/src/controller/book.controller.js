const bookModel = require("../models/book.model")
const Book= require("../models/book.model")
const BookCopy=require("../models/bookCopy.model")
const apiResponse = require("../utils/apiResponse")
const apiError = require("../utils/apiError")
const asyncHandler = require("../utils/asyncHandler")
const generateQR=require("../utils/QR_gen")

exports.Allbook=asyncHandler(async (req,res)=>{
    const books=await Book.find()

    return res.
    status(200)
    .json(new apiResponse(200,books,"books fetched successfully"))
})

exports.createBook=asyncHandler(async (req,res)=>{
    const {title,author,totalCopies}=req.body

    //create book
    const book= await Book.create({
        title,
        author,
        totalCopies,
        availableCopies:totalCopies
    })

    //create copies with qr
    let copies=[];

    for(let i=0;i<totalCopies;i++){
        const qrText=`${book?.title}_${book?._id}_${i}`
        const qrImage=await generateQR(qrText)
        const copy= await BookCopy.create({
            bookId:book?._id,
            qrCode:qrText,
            qrImage:qrImage 
        })
        copies.push(copy)
    }
    return res
    .status(200)
    .json(new apiResponse(200,{book,copies},"book and copies created successfully"))//copy give en error ,put copies
})

exports.deleteBook=asyncHandler(async (req,res)=>{

    const {id}=req.params

    //delete copies
    await BookCopy.deleteMany({bookId:id})

    //delete book
    const book=await Book.findByIdAndDelete(id)

    if(!book){
        apiError(404,"book not found")
    }

    return res
    .status(200)
    .json(new apiResponse(200,book,"book deleted successfully"))
})

exports.getAllQRcodes=asyncHandler(async (req,res)=>{

    const copies = await BookCopy.find().populate("bookId","title author")

    const format=copies.map(copy =>({
        bookTitle:copy.bookId?.title,
        author:copy.bookId?.author,
        qrCode:copy.qrCode,
        qrImage:copy.qrImage,
        status:copy.status
    }))

    return res
    .status(200)
    .json(new apiResponse(200,format,"fetched successfully"))
})