const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    phone:String,
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","admin"],
        default:"student"
    }
},{timestamps:true})

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefToken=function(){
    return jwt.sign(
        {
        _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

module.exports=mongoose.model("User",userSchema)