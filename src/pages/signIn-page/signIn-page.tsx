import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FormValues, SignIn } from '@/components/auth/sign-in'
import { useLoginMutation } from '@/services/auth'

import s from './signIn-page.module.scss'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'

  const handleSignIn = async (data: FormValues) => {
    try {
      await login({ rememberMe: false, ...data }).unwrap()
      navigate(fromPage, { replace: true })
    } catch (error: any) {
      if (error.status === 401) {
        setError('Incorrect email or password')
      }
    }
  }

  return (
    <div className={s.modalWrapper}>
      <SignIn handleSignIn={handleSignIn} validationError={error} />
    </div>
  )
}
