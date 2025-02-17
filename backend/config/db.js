import mongoose from "mongoose";

export const connectDB = async () => {
    console.log("MongoDB URL:", process.env.MONGO_URL);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // process code 1 code means exit with failure, 0 means success
    }
};

//muaunwongtums
//Zaey3ugJC6DQgFFZ