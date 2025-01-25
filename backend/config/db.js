import mongoose from "mongoose";



const connectDB=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
          dbName:"MERN_Chat_App"
        })
        console.log(`mongodb connected: ${conn.connection.host}`.bgWhite.bold)
    }
    catch(error){
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(); // Exit with a non-zero status code to indicate an error
    }
}
export default connectDB;