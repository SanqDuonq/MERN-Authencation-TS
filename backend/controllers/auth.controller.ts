import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

import {Request,Response} from 'express'
import { User } from '../models/user.model'
import { generateVerificationCode } from '../utils/generate-code'
import { generateTokenAndSetCookie } from '../utils/generate-token-cookie'
import { sendPasswordReset, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mail/mail'
import { CustomRequest } from '../middleware/verify-token'

export const signup = async(req:Request, res:Response):Promise<void> => {
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

        
        const {password:_, ...userObject} = newUser.toObject()

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
    console.log('Login function reached')
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) 
        {
            res.status(400).json({success: false, message: 'Invalid credentials'})
            return;
        }
        const isPasswordValid = await bcryptjs.compare(password,user.password)

        if (!isPasswordValid)
        {
            res.status(400).json({success: false, message: 'Invalid credentials'})
        }
        generateTokenAndSetCookie(res,user._id.toString())

        user.lastLogin = new Date()

        await user.save()

        const {password:_,...userObejct} = user.toObject()
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: userObejct
        })
            
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({
            success: false,
            message: error
        })   
    }
}

export const logout = async(req:Request,res:Response) => {
    res.clearCookie('token')
    res.status(200).json({success: true, message: 'Logged out successfully'})
}

export const verifyEmail = async(req:Request, res:Response): Promise<void> => {
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

export const forgotPassword = async (req:Request, res:Response) => {
    const {email}  = req.body

    try {
        const user = await User.findOne({email})
        if (!user)
        {
            res.status(400).json({success:false, message: 'User not found'})
            return;
        }

        //Generate Token
        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpireAt = Date.now() + 1000 * 60 * 10

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiredAt = new Date(resetTokenExpireAt)

        await user.save()

        //Send Email
        await sendPasswordReset(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        
        res.status(200).json({
            success: true,
            message: 'Password reset link sent to your email'
        })
    } catch (error) {
        console.log('Error in forgotPassword',error)
        res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const resetPassword = async(req:Request, res:Response) => {
    try {
        const {token} = req.params;
        const {password} = req.body
        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiredAt: {$gt:Date.now()}
        })

        if (!user) {
            res.status(400).json({success: false, message: "Invalid or expired reset token"})
            return;
        }

        //updatePassword
        const hashedPassword = await bcryptjs.hash(password,10)

        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiredAt = undefined

        await user.save()
        await sendResetSuccessEmail(user.email)

        res.status(200).json({success: true, message: 'Password reset successfully'})
    } catch (error) {
        res.status(400).json({success: false, message: error})
    }
}

export const checkAuth = async (req:CustomRequest, res:Response) => {
    try {
        const user = await User.findById(req.userID).select("-password")
        if (!user) {
            res.status(400).json({success: false, message: 'User not found'})
        }
        res.status(200).json({success:true, user})
    } catch (error) {
        console.log('Error in checkAuth',error)
    }
}

