import { FormValues, SignIn } from '@/components/auth/signIn'
import { Header } from '@/components/layout/header'
import { useLoginMutation } from '@/services/auth'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const handleSignIn = (data: FormValues) => {
    login(data)
  }

  return (
    <div>
      <Header isLogedIn={false} />
      <SignIn handleSignIn={handleSignIn} />
    </div>
  )
}
