import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormValues, SignIn } from '@/components/auth/signIn'
import { Header } from '@/components/layout/header'
import { useLoginMutation } from '@/services/auth'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const [error, setError] = useState('')
  const navitage = useNavigate()
  const handleSignIn = async (data: FormValues) => {
    try {
      await login({ rememberMe: false, ...data }).unwrap()
      navitage('/')
    } catch (error: any) {
      if (error.status === 401) {
        setError('Incorrect email or password')
      }
    }
  }

  return (
    <div>
      <Header isLogedIn={false} />
      <SignIn handleSignIn={handleSignIn} validationError={error} />
    </div>
  )
}
