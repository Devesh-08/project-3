const Transaction=require("../models/transaction.model")
const User= require("../models/user.model")
const BookCopy=require("../models/bookCopy.model")
const Book=require("../models/book.model")
const asyncHandler=require("../utils/asyncHandler")
const apiError=require("../utils/apiError")
const apiResponse=require("../utils/apiResponse")

//issue books
exports.issueBook=asyncHandler(async (req,res)=>{

    const {bookQR}=req.body
    const userId=req.user?.id
    // console.log(userId);

    //findUser
    const user= await User.findById(userId)
    // console.log("user:",user);
    if(!user){
        throw new apiError(404,"user not found")
    }

    //find book copy
    const copy=await BookCopy.findOne({qrCode:bookQR})
    if(!copy) throw new apiError(404,"Book not found")
    
    //check avilability
    if(copy.status ==="issued"){
        return res
        .status(400)
        .json(new apiResponse(400,{},"Book already issued"))
    }

    //create transaction
    const issueDate=new Date()
    const dueDate=new Date()
    dueDate.setDate(issueDate.getDate()+7)

    const transaction=await Transaction.create({
        userId:user?._id,
        copyId:copy?._id,
        issuedDate:issueDate,
        dueDate,
        status:"issued"
    })

    //update book copy
    copy.status="issued",
    await copy.save()

    //update book count
    await Book.findByIdAndUpdate(copy.bookId,{
        $inc:{availableCopies:-1}
    })

    return res
    .status(200)
    .json(new apiResponse(200,transaction,"Book issued successfully"))
})

//return book
exports.returnBook=asyncHandler(async(req,res)=>{
    const {bookQR}=req.body

    //find book copy
    const copy=await BookCopy.findOne({qrCode:bookQR})
    if(!copy) throw new apiError(404,"book not found")
    // console.log("copy:",copy);

    //find active transaction
    const transaction=await Transaction.findOne({
        copyId:copy?._id,
        status:"issued"
    })

    if(!transaction){
        throw new apiError("no active transaction")
    }

    //fine calculation
    const today= new Date()
    let fineAmount=0

    if(today > transaction.dueDate){
        const lateDays=Math.ceil((today-transaction.dueDate)/(1000*60*60*24))
        fineAmount=lateDays*5
    }

    //update transaction
    transaction.returnDate=today;
    transaction.status="returned";
    transaction.fine.amount=fineAmount;
    await transaction.save()

    //update copy status 
    copy.status="available";
    await copy.save()

    //update book count
    await Book.findByIdAndUpdate(copy.bookId,{
        $inc:{availableCopies:1}
    })

    return res
    .status(200)
    .json(new apiResponse(200,{fineAmount,today},"book returned successfully"))

})

//all transaction
exports.getAllTransactions=asyncHandler(async (req,res)=>{
    try {
        const transaction=await Transaction.find()
        .populate("userId","name")
        .populate({
            path:"copyId",
            populate:{
                path:"bookId",
                select:"title"
            }
        })

        return res
        .status(200)
        .json(new apiResponse(200,transaction,"Fetched successfully"))
    } catch (error) {
        new apiError(500,"failed to fetch transaction")
    }
})