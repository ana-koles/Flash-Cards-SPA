import { SignIn } from '@/components/auth/signIn'
import { Header } from '@/components/layout/header'

export const SignInPage = () => {
  const handleSignIn = () => {}

  return (
    <div>
      <Header isLogedIn={false} />
      <SignIn handleSignIn={handleSignIn}/>
    </div>
  )
}
