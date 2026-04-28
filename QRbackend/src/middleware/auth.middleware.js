const User=require('../models/user.model')
const apiError=require('../utils/apiError')
const asyncHandler=require("../utils/asyncHandler")
const jwt=require('jsonwebtoken')

exports.verifyJWT=asyncHandler(async(req,res,next)=>{
   try {
     const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")// after bearer leave a space before token
 
     if(!token){
         throw new apiError(401,"Unauthorized access")
     }
 
     const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    //  console.log("decoded token",decodedToken);
 
     const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
 
     if(!user){
         throw new apiError(401,"Invalid access token")
     }
 
     req.user=user
     next()
   } catch (error) {
    // console.log(error.message)
    // console.error(error)
    throw new apiError(401,"Invalid or expired token")
   }
})