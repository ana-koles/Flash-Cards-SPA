import { useNavigate } from 'react-router-dom'

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { usePasswordRecoverMutation } from '@/services/auth'

export const ForgotPasswordPage = () => {
  const [passwordRecover] = usePasswordRecoverMutation()
  const navigate = useNavigate()

  const handlePasswordRecover = async ({ email }: { email: string }) => {
    try {
      await passwordRecover(
        {
          email: email,
          html: '<h1>Hi, ##name##</h1><p>Click <a href="##token##">here</a> to recover your password</p>',
          subject: 'Password Recovery',
        },
        {
          extraOptions: { skipMeRequest: true },
        }
      )
      navigate('/checkEmail', { state: { email: email } })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <ForgotPasswordForm handlePasswordRecover={handlePasswordRecover} />
    </div>
  )
}
