const mongoose=require('mongoose')

const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`\n MongoDB connected ! DB HOST:${connection.connection.host}`);
    } catch (error) {
        console.log("mongoDB connection error",error);
        process.exit(1)
    }
}

module.exports=connectDB