import { Request, Response,NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface CustomRequest extends Request { 
    userID?: string
}

export const verifyToken = (req:CustomRequest, res:Response,next:NextFunction) => {
    const token = req.cookies.token;
    if (!token)
        res.status(401).json({sucess: false, message: 'Unauthorized - no token provided'})

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
        if (!decode)
            res.status(401).json({success: false, message: 'Unauthorized - invalid token'})
        if (typeof decode === 'object' && 'userID' in decode)
            req.userID = decode.userID as string 
        next()
    } catch (error) {
        console.log('Error in verifyToken',error)
    }

}