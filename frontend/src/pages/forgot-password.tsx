import { useState } from "react"
import { useAuthStore } from "../components/store/auth-store"
import { motion } from 'framer-motion'
import { ArrowLeft, LoaderCircle, Mail } from "lucide-react"
import { InputComponent } from "../components/input"
import { Link } from "react-router-dom"
export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const { isLoading, forgotPassword } = useAuthStore()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await forgotPassword(email)
        setIsSubmitted(true)
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
                        Forgot Password
                    </p>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className="text-gray-300 mb-6 text-center">
                                Enter your email address and we'll sent you a link to reset your password
                            </p>
                            <InputComponent
                                icon={Mail}
                                name="Email"
                                value={email}
                                type='text'
                                onChange={(e) => setEmail(e.target.value)}
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
                                {isLoading ? <LoaderCircle className="size-6 animate-spin mx-auto" /> : 'Send Reset Link'}
                            </motion.button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="size-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                                <Mail className="size-8 text-white" />
                            </motion.div>
                            <p className="text-gray-300 mb-6">
                                If an account exists for <span className="text-green-500">{email}</span>, you will receice a password link shortly
                            </p>
                        </div>
                    )}
                </div>
                <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                    <Link to='/login' className="text-sm text-green-400 hover:underline flex items-center">
                        <ArrowLeft className="size-4 mr-2" /> Back to login
                    </Link>
                </div>
            </motion.div>
        </>
    )
}