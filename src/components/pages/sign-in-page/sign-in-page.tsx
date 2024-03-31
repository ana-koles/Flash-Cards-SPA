import { SignUp } from '@/components/auth/signUp'
import { Header } from '@/components/layout/header'

export const SignInPage = () => {
  return (
    <div>
      <Header isLogedIn={false} />
      <SignUp />
    </div>
  )
}
