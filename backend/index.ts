import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from '../backend/routes/auth.route'
import { connectDB } from './database/connect-database'
import cors from 'cors'
dotenv.config()


const app = express()
const port = process.env.PORT || 5000;


app.use(cors({origin: 'http://localhost:5173',credentials:true}))
app.use(express.json()); // allows us to parse incoming requests: req.body
app.use(cookieParser()); //allows us to parse incoming cookies
app.use('/api/auth',authRoutes)


app.listen(port,() => {
    connectDB()
    console.log(`Server is running on ${port}`)
})