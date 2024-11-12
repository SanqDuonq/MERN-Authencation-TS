import { useState } from "react"
import { motion } from 'framer-motion'
import { InputComponent } from "../components/input"
import { Lock, Mail,LoaderCircle } from 'lucide-react'
import { Link } from "react-router-dom"
import { useAuthStore } from "../components/store/auth-store"
import toast from "react-hot-toast"
export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login,isLoading,error} = useAuthStore()
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    await login(email,password)
    toast.success('Login success')
    e.preventDefault()
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <p className="text-3xl font-medium mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Welcome Back
          </p>
          <form onSubmit={handleLogin}>
            <InputComponent
              name='Email'
              type="text"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              name='Password'
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <Link to='/forgot-password' className="text-sm text-green-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
            <motion.button
              className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
                    font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <LoaderCircle className="size-6 animate-spin mx-auto"/>: 'Login'}
            </motion.button>
          </form>

        </div>
        <div className='py-4 bg-gray-800 bg-opacity-50 text-center'>
          <p className='text-sm text-gray-400'>
            Don't have an account?
            <Link to={'/sign-up'} className='text-green-400 hover:underline ml-1'>
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  )
}

