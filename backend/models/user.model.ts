import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/user.interface";

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