const express=require('express')
const router=express.Router()

const {register,login,refreshAccessToken}=require("../controller/user.controller")

router.post("/register",register)
router.post("/login",login)
router.post('/refreshToken',refreshAccessToken)

module.exports=router