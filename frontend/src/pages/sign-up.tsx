import {motion} from 'framer-motion'
import { InputComponent } from '../components/input'
import { LoaderCircle, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PasswordStrength } from '../components/password-strength'
import { useAuthStore } from '../components/store/auth-store'
type AuthState = {
    user: unknown
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    isCheckingAuth: boolean;
    signup: (email: string, password: string, name: string) => Promise<void>;
};
export const SignUpPage = () => {
    const [name,setName] = useState('')
    const [mail,setMail] = useState('')
    const [password,setPassword] = useState('')
    
    const {signup,isLoading,error} = useAuthStore() as AuthState
    const navigate = useNavigate()
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signup(mail,password,name)
            navigate('/verify-email')
        } catch (error) {
            console.log('Error',error)
        }
    }

  return (
    <motion.div
        initial ={{opacity:0,y:20}}
        animate ={{opacity:1,y:0}}
        transition={{duration:1.5}}
        className='max-w-md w-full bg-gray-800 opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div className='p-8'>
            <p className='text-3xl w-full font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text'>Create Your Account</p>
            <form onSubmit={handleSubmit}>
                <InputComponent 
                    icon={User} 
                    name='Full Name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputComponent 
                    icon={Mail} 
                    name='Email Address'
                    type='text'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                <InputComponent 
                    icon={Lock} 
                    name='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className='text-red-500 font-semibold text-sm text-center'>{error}</p>}
                <PasswordStrength 
                    password={password}
                />
                <motion.button
                    className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
                    font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200'
                    whileHover={{scale:1.02}}
                    whileTap={{scale:0.98}}
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? <LoaderCircle className=' animate-spin mx-auto size-8' /> : 'Sign Up'}
                </motion.button>
            </form>
        </div>
        <div className='py-4 bg-gray-900 bg-opacity-50 text-center'>
            <p className='text-sm text-gray-400'> 
                Don't have an account?
                <Link to = {'/login'} className='text-green-400 hover:underline ml-1'>
                    Login
                </Link>
            </p>
        </div>
    </motion.div>
  )
}

