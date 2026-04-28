const mongoose=require("mongoose")

const transactionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    copyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"BookCopy"
    },
    issuedDate:Date,
    dueDate:Date,
    returnDate:Date,

    status:{
        type:String,
        enum:["issued","returned","overdue"],
        default:"issued"
    },
    fine:{
        amount:{
            type:Number,
            default:0
        },
        paid:{
            type:Boolean,
            default:false
        }
    }
},{timestamps:true})

module.exports=mongoose.model("Transaction",transactionSchema)