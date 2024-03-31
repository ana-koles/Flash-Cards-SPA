import { FormValues, SignUp } from '@/components/auth/signUp'
import { Header } from '@/components/layout/header'
import { useSignUpMutation } from '@/services/auth'
import { SignUpBody } from '@/services/auth/auth.types'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  const handleSignUp = (data: FormValues) => {
    console.log(data)
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

    signUp(signUpBody)
    console.log(signUpBody)
  }

  return (
    <div>
      <Header isLogedIn={false} />
      <SignUp handleSignUp={handleSignUp} />
    </div>
  )
}
