import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const connectDB = async() =>{
    try {
        mongoose.set("strictQuery", false);
        //Debugging MONGODB_URI
        console.log("MONGODB_URI:", process.env.MONGODB_URI);
        if( !process.env.MONGODB_URI){
            console.error("MONGODB_URI is undefined,",error.message);
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected${conn.connection.host}`);
    } catch (error) {
        console.error("Database Connection Error:", error.message);
        process.exit(1); // Exit with failure
    }
}

export default connectDB;