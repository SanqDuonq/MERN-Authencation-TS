import { useState } from "react"
import { motion } from 'framer-motion'
import { InputComponent } from "../components/input"
import { LoaderCircle, Lock } from "lucide-react"
import { useAuthStore } from "../components/store/auth-store"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { resetPassword,isLoading} = useAuthStore()
    const { token } = useParams()
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Password do not match')
            return;
        }
        if (!token) {
            toast.error('Invalid token')
            return
        }
        try {
            await resetPassword(token, password)
            toast.success('Password reset successful')
            setTimeout(() => navigate('/login'),2000)
        } catch (error) {
            toast.error('Error reset password')
            console.log(error)
        }
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="p-8">
                    <p className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text ">
                        Reset Password
                    </p>
                    <form onSubmit={handleSubmit}>
                        <InputComponent
                            icon={Lock}
                            name="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                        <InputComponent
                            icon={Lock}
                            name="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type= 'password'
                        />
                        <motion.button
                            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
                             font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
                                 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <LoaderCircle className="size-6 animate-spin mx-auto" /> : 'Set New Password'}
                        </motion.button>
                    </form>
                </div>

            </motion.div>
        </>
    )
}