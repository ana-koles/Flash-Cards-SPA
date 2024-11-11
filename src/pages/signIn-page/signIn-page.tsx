import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { setIsLoggedIn } from '@/app-slice'
import { FormValues, FormWrapper, SignIn } from '@/components'
import { useLoginMutation } from '@/services/auth'

export const SignInPage = () => {
  const dispatch = useDispatch()
  const [login] = useLoginMutation()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'

  const handleSignIn = async (data: FormValues) => {
    try {
      await login({ rememberMe: false, ...data }).unwrap()
      navigate(fromPage, { replace: true })
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } catch (error: any) {
      if (error.status === 401) {
        setError('Incorrect email or password')
      }
    }
  }

  return (
    <FormWrapper>
      <SignIn handleSignIn={handleSignIn} validationError={error} />
    </FormWrapper>
  )
}
