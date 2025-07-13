import mongoose from "mongoose";

export const connDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db connected successfully!");
    } catch (error) {
        console.error("Error while connecting to DB")
        process.exit(1)
    }
}