import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FormValues, SignIn } from '@/components/auth/signIn'
import { useLoginMutation } from '@/services/auth'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const [error, setError] = useState('')
  const navitage = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'

  const handleSignIn = async (data: FormValues) => {
    try {
      await login({ rememberMe: false, ...data }).unwrap()
      navitage(fromPage, { replace: true })
    } catch (error: any) {
      if (error.status === 401) {
        setError('Incorrect email or password')
      }
    }
  }

  return (
    <div>
      <SignIn handleSignIn={handleSignIn} validationError={error} />
    </div>
  )
}

{
  /* <div>
      <Header isLogedIn={false} />
      <SignIn handleSignIn={handleSignIn} validationError={error} />
    </div> */
}
