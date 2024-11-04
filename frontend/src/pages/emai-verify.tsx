import React, { useEffect, useRef, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
export const EmailVerifyPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    // const navigate = useNavigate()
    const isLoading = false
    const handleChange = (index:number, value:string) => {
        const newCode = [...code]

        //Handle pasted content

        if (value.length > 1) {
            const pastedCode = value.slice(0,6).split("")
            for (let i = 0;i < 6;i++) {
                newCode[i] = pastedCode[i] || ""
            }
            setCode(newCode)

            //Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "")
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
            inputRefs.current[focusIndex]?.focus()
        }
        else {
            newCode[index] = value;
            setCode(newCode)

            //Move focus to the next input field if value is entered
            if (value && index < 5){
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index:number, e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0){
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const verifyCode = code.join('')
        console.log(`Verification code submitted: ${verifyCode}`)
        
    }
    //Auto submit 
    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            handleSubmit({preventDefault: () => {}} as React.FormEvent<HTMLFormElement>)
        }
    },[code])
    return (
        <>
            <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="p-8">
                        <p className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                            Verify Your Email
                        </p>
                        <p className="text-gray-300 text-center mb-6">
                            Enter the 6-digits code sent to your email address
                        </p>
                        <form 
                            onSubmit={handleSubmit}
                            className="space-y-6">
                            <div className="flex justify-between">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        maxLength={6}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="size-12 text-center text-2xl font-bold bg-gray-700 text-white borde-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none"

                                    />
                                ))}
                            </div>
                            <motion.button
                                className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
                                            font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-500
                                            transition-all duration-200 disabled:opacity-50'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type='submit'
                                disabled={isLoading || code.some((digit => !digit))}
                            >
                                {isLoading ? 'Verifying...' : 'Verify Email'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    )
}