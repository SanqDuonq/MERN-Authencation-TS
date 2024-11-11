import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MongoURI as string)
        console.log(`Connect success: ${connect.connection.host}`)
    }
    catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}