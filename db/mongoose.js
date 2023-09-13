import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}