const app=require('./src/app.js')
const connectDB=require('./src/db/index.js')
require('dotenv').config()

const PORT=process.env.PORT || 5000;

connectDB()
.then(()=>{
    app.listen(process.env.PORT ||5000,()=>{
        console.log(`server is running at port:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB DB CONNECTION FAILED",err);
})
