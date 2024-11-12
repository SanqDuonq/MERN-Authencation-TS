import { Response } from "express";
import  jwt  from "jsonwebtoken";
export const generateTokenAndSetCookie = (res:Response,userID:string) => {
    const token = jwt.sign({userID},process.env.JWT_SECRET || 'defaulSecret',{
        expiresIn: '7d'
    })

    res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'lax'
    })
    return token;
}

