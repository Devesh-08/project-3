const express = require("express")
const router = express.Router()
const transactionController=require("../controller/transaction.controller")
const authorizeRoles=require('../middleware/role.middleware')
const {verifyJWT}=require("../middleware/auth.middleware") 

router.post("/issue",verifyJWT,authorizeRoles("student"),verifyJWT,transactionController.issueBook)
router.post("/return",verifyJWT,authorizeRoles("student"),transactionController.returnBook)
router.get("/allTransaction",verifyJWT,authorizeRoles("admin"),transactionController.getAllTransactions)
router.delete("/deleteTransaction/:id",verifyJWT,authorizeRoles("admin"),transactionController.deleteTransaction)

module.exports=router