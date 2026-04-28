const mongoose=require('mongoose')

const copySchema=new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    qrCode:{
        type:String,
        unique:true,
    },
    qrImage:String,
    status:{
        type:String,
        enum:["available","issued"],
        default:"available"
    }
},{timestamps:true})

module.exports=mongoose.model("BookCopy",copySchema)
