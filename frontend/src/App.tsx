import { Route, Routes } from "react-router-dom"
import { FloatShape } from "./components/float-shape"
import { SignUpPage } from "./pages/sign-up"
import { LoginPage } from "./pages/login"
import { EmailVerifyPage } from "./pages/emai-verify"

function App() {

  return (
    <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
            <FloatShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
            <FloatShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5}/>
            <FloatShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>

            <Routes>
              <Route path="/" element = {'Home'} />
              <Route path="/sign-up" element = {<SignUpPage/>} />
              <Route path="/login" element = {<LoginPage/>} />
              <Route path="/verify-email" element = {<EmailVerifyPage/>}/>
            </Routes>
        </div>
    </>
  )
}

export default App
