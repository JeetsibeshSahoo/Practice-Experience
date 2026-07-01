import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.log("Error", error);
        process.exit(1);
    }
}