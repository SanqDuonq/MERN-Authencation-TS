import { Navigate, Route, Routes } from "react-router-dom"
import { FloatShape } from "./components/float-shape"
import { SignUpPage } from "./pages/sign-up"
import { LoginPage } from "./pages/login"
import { EmailVerifyPage } from "./pages/emai-verify"
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from "./components/store/auth-store"
import { ReactNode, useEffect } from "react"
import { DashBoardPage } from "./pages/dashboard"
import { LoadingSpinner } from "./components/loading-spinner"


//protect routes that requires authencation
const ProtectRoute = ({children}: {children:ReactNode}):JSX.Element => {
  const {isAuthenticated,user} = useAuthStore()
  if (!isAuthenticated) 
    return <Navigate to='/login' replace/>
  if (!user?.isVerified)
    return <Navigate to='/verify-email' replace/>

  return <>{children}</>
}

//redirect authenticated user to the home page 
const RedirectAuthenticated = (({ children }: { children: ReactNode }): JSX.Element => {
  const { isAuthenticated, user } = useAuthStore()

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to='/' replace />
  }
  return <>{children}</>
})
function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  if (isCheckingAuth) return <LoadingSpinner/>
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
        <FloatShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
        <FloatShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
        <FloatShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

        <Routes>
          <Route path="/" element={
            <ProtectRoute>
              <DashBoardPage/>
            </ProtectRoute>
          } />
          <Route path="/sign-up" element={
            <RedirectAuthenticated>
              <SignUpPage />
            </RedirectAuthenticated>}
          />
          <Route path="/login" element={
            <RedirectAuthenticated>
              <LoginPage />
            </RedirectAuthenticated>
          } />
          <Route path="/verify-email" element={<EmailVerifyPage />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
