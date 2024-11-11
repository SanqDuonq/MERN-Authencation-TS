export interface IUser extends Document {
    email: string
    password: string
    name: string
    lastLogin: Date
    isVerified: Boolean
    resetPasswordToken: string | undefined
    resetPasswordExpiredAt: Date | undefined
    verificationToken: string | undefined
    verificationExpiredAt: Date | undefined
}