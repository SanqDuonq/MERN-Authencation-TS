import {motion} from 'framer-motion'
import { InputComponent } from '../components/input'
import { Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
export const SignUpPage = () => {
    const [name,setName] = useState('')
    const [mail,setMail] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

  return (
    <motion.div
        initial ={{opacity:0,y:20}}
        animate ={{opacity:1,y:0}}
        transition={{duration:1.5}}
        className='max-w-md bg-gray-800 opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div className='p-8'>
            <p className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text'>Create Your Account</p>
            <form onSubmit={handleSubmit}>
                <InputComponent 
                    icon={User} 
                    name='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputComponent 
                    icon={Mail} 
                    name='Email Address'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                <InputComponent 
                    icon={Lock} 
                    name='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
        </div>
    </motion.div>
  )
}

