import { useNavigate } from 'react-router-dom'

import { SignUp } from '@/components/auth/signUp'
import { useSignUpMutation } from '@/services/auth'
import { SignUpBody } from '@/services/auth/auth.types'

export type SignUpData = Pick<SignUpBody, 'email' | 'password'>

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navitage = useNavigate()

  const handleSignUp = async (data: SignUpData) => {
    try {
      const index = data.email.indexOf('@')
      let name = ''

      if (index !== -1) {
        name = data.email.slice(0, index)
      }

      const signUpBody: SignUpBody = {
        html: `<b>Hello, ##name##!<br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:5173/confirm-email/##token##">Confirm email</a>. If it doesn't work, copy and paste the following link in your browser:<br/>http://localhost:5173/confirm-email/##token##`,
        name,
        sendConfirmationEmail: false,
        subject: 'Verify your email address',
        ...data,
      }

      await signUp(signUpBody)

      navitage('/')
    } catch {
      alert('Something went wrong')
      throw new Error('Something went wrong')
    }
  }

  return (
    <div>
      {/*       <Header isLogedIn={false} /> */}
      <SignUp handleSignUp={handleSignUp} />
    </div>
  )
}
