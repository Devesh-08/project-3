const User=require('../models/user.model')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const apiResponse=require('../utils/apiResponse')
const apiError=require("../utils/apiError")
const asyncHandler=require('../utils/asyncHandler')

//gen of access&refresh token
const genAccessRefreshToken=async(userId)=>{
    try {
        const user= await User.findById(userId)

        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        // console.error(error)
        throw new apiError(500,"something went wrong while generating refresh and access token")
    }
}

// access token refresh method
exports.refreshAccessToken=asyncHandler(async (req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new apiError(401,"unauthorized requests")
    }

    try {
        const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

        const user= await User.findById(decodedToken?._id)

        if(!user){
            throw new apiError(401,"invalid refresh token")
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new apiError(401,"refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const {accessToken,newRefreshToken}=await genAccessRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accesstoken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new apiResponse(200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new apiError(401,error?.message ||"invalid refresh token")
    }
})

//register
exports.register= asyncHandler(async (req,res)=>{
    const {name,email,password,role}=req.body

    const exists=await User.findOne({email})

    if(exists){
        throw new apiError(400,"User already exists")
    }

    const hashedPassword= await bcrypt.hash(password,10)

    const user=await User.create({
        name,
        email,
        password:hashedPassword,
        role:role || "student"//default
    })

    return res
    .status(200)
    .json(new apiResponse(200,user,"user registered successfuuly"))
})

//login
exports.login=asyncHandler(async (req,res)=>{
    const {email,password}=req.body

    //find user
    const user= await User.findOne({email})
    if(!user){
        throw new apiError(404,"user not found")
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new apiError(400,"invalid credentials")
    }

    // const token=jwt.sign({id:user?._id},process.env.SECRET_KEY,{expiresIn:"7d"})
    const {accessToken,refreshToken}=await genAccessRefreshToken(user._id)
    const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User Logged In successfully"
            )
        )
})

