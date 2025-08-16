import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Welcome to the connection of the Blood-Donation Database.');
        
    } catch (error) {
        console.log(`Could not connect. Error: ${error}`);
        process.exit(1);
    }
}