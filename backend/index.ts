import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './database/connect-database';
import authRoutes from '../backend/routes/auth.route';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({origin: `https://mern-authencation-ts-fe.vercel.app`,credentials:true}))
app.use(express.json()); 
app.use(cookieParser()); 
app.use('/api/auth',authRoutes)
app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
    connectDB();
});

export default app;