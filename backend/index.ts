import express from 'express'
import dotenv from 'dotenv'
import authRoutes from '../backend/routes/auth.route'
import { connectDB } from './database/connect-database'
dotenv.config()


const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth',authRoutes)


app.listen(port,() => {
    connectDB()
    console.log(`Server is running on ${port}`)
})