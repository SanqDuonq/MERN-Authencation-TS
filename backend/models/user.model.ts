import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
    email: string
    password: string
    name: string
    lastLogin: Date
    isVerified: Boolean
    resetPasswordToken: string
    resetPasswordExpiredAt: Date
    verificationToken: string | undefined
    verificationExpiredAt: Date | undefined
}

const userSchema:Schema<IUser> = new Schema({
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,
    verificationToken: String,
    verificationExpiredAt:Date,
},{timestamps:true})

export const User = mongoose.model('User',userSchema)