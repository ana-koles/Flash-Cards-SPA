import { CreateNewPasswordForm } from '@/components/auth/create-new-password'
import { useResetPasswordMutation } from '@/services/auth'

export const CreateNewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()

  const token = ''

  const handleResetPassword = ({ password }: { password: string }) => {
    resetPassword({ password, token })
  }

  return (
    <div>
      <CreateNewPasswordForm onSubmit={handleResetPassword} />
    </div>
  )
}
