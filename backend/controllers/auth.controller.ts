import {Request,Response} from 'express'
import { User } from '../models/user.model'
import bcryptjs from 'bcryptjs'
import { generateVerificationCode } from '../utils/generate-code'
import { generateTokenAndSetCookie } from '../utils/generate-token-cookie'
import { sendVerificationEmail, sendWelcomeEmail } from '../mail/mail'

export const signup = async(req:Request,res:Response):Promise<void> => {
    const {email, password, name} = req.body
    try {    
        if (!email || !password || !name) {
            res.status(400).json({success: false, message: 'All fields are required' });
            return;
        }

        const userAlreadyExists = await User.findOne({email})
        if (userAlreadyExists){
            res.status(400).json({success:false, message: 'User already exists'})
            return;
        }
            
        const hashedPassword = await bcryptjs.hash(password,10)
        const verificationToken = generateVerificationCode();
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationToken,
            verificationExpiredAt: new Date(Date.now() +  24 * 60 * 60 * 1000)
        })
        await newUser.save();

        //jwt
        generateTokenAndSetCookie(res,newUser._id.toString())

        await sendVerificationEmail(newUser.email,verificationToken)

        
        const {password: _, ...userObject} = newUser.toObject()

        res.status(201).json({
            success: true,
            message: 'User created succesfully',
            newUser: userObject
        })

    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({success: false,message: error})
        }
    }
}

export const login = async(req:Request,res:Response) => {
    res.send('login route')
}

export const logout = async(req:Request,res:Response) => {
    res.send('logout route')
}

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
    const {code} = req.body

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationExpiredAt: {$gt: Date.now()}
        })

        if (!user) {
            res.status(400).json({success: false, message: 'Invalid or expired verification code'})
            return;
        }

        user.isVerified = true;
        user.verificationToken = undefined
        user.verificationExpiredAt = undefined

        await user.save()
        await sendWelcomeEmail(user.email,user.name)

        res.status(200).json({
            success: true, 
            message: 'Email verify successfully'
        })

    } catch (error) {
        
    }
}


