import express, { Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './database/connect-database'
import authRoutes from '../backend/routes/auth.route'
import cors from 'cors'
dotenv.config()
const app = express()

app.use(cors({origin: 'https://mern-authencation-ts.vercel.app/',credentials:true}))
app.use(express.json()); // allows us to parse incoming requests: req.body
app.use(cookieParser()); //allows us to parse incoming cookies

app.get('/',(req,res:Response) => {
    res.send('Hello world')
})

app.use('/api/auth',authRoutes)
connectDB()

export default app;