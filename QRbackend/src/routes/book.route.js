const express= require("express")
const router= express.Router()
const bookController=require("../controller/book.controller")
const authorizeRole=require('../middleware/role.middleware')
const {verifyJWT}=require('../middleware/auth.middleware')

router.get("/Allbooks",verifyJWT,authorizeRole("student","admin"),bookController.Allbook)

router.post("/create",verifyJWT,authorizeRole("admin"),bookController.createBook)

router.get("/getAllQR",verifyJWT,authorizeRole("student","admin"),bookController.getAllQRcodes)

router.delete("/delete/:id",verifyJWT,authorizeRole("admin"),bookController.deleteBook)

module.exports=router