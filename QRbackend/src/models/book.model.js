const mongoose = require("mongoose")

const bookSchema=new mongoose.Schema({
    title:String,
    author:String,
    publisher:String,
    isbn:String,
    category:String,
    totalCopies:Number,
    availableCopies:Number
},{timestamps:true})

module.exports=mongoose.model("Book",bookSchema)