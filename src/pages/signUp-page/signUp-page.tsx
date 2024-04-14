import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignUp } from '@/components/auth/sign-up'
import { useNavigateSearch } from '@/hooks/useNavigateSearch'
import { useSignUpMutation } from '@/services/auth'
import { SignUpBody } from '@/services/auth/auth.types'

import s from './signUp-page.module.scss'

export type SignUpData = Pick<SignUpBody, 'email' | 'password'>

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigateSearch()

  debugger
  const [error, setError] = useState('')

  const handleSignUp = async (data: SignUpData) => {
    try {
      const index = data.email.indexOf('@')
      let name = ''

      if (index !== -1) {
        name = data.email.slice(0, index)
      }
      const signUpBodyData: SignUpBody = {
        name,
        sendConfirmationEmail: true,
        ...data,
      }

      await signUp(signUpBodyData).unwrap()

      navigate('/checkEmail', { email: data.email })
    } catch (error: any) {
      if (error.status === 400) {
        setError('Email already exists')
      }
    }
  }

  return (
    <div className={s.modalWrapper}>
      <SignUp handleSignUp={handleSignUp} validationError={error} />
    </div>
  )
}
