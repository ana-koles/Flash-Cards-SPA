import { useState } from 'react'

import { FormWrapper, SignUp } from '@/components'
import { useNavigateSearch } from '@/hooks'
import { SignUpBody, useSignUpMutation } from '@/services/auth'

export type SignUpData = Pick<SignUpBody, 'email' | 'password'>

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigateSearch()

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
    <FormWrapper>
      <SignUp handleSignUp={handleSignUp} validationError={error} />
    </FormWrapper>
  )
}
