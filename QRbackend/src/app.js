const express=require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")

const app=express()

//middlewares
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

//routes
const userRouter=require('./routes/user.route')
const bookRouter=require('./routes/book.route')
const transactionRouter=require('./routes/transaction.route')

app.use("/users",userRouter)
app.use("/books",bookRouter)
app.use("/transaction",transactionRouter)

module.exports=app;