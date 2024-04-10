import { useNavigate } from 'react-router-dom'

import { CreateNewPasswordForm } from '@/components/auth/create-new-password'
import { useResetPasswordMutation } from '@/services/auth'

import s from './create-new-password-page.module.scss'

export const CreateNewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const urlParams = new URLSearchParams(window.location.search)
  let token = ''
  const navigate = useNavigate()

  if (urlParams.has('token')) {
    token = urlParams.get('token') ?? ''
  }
  debugger

  const handleResetPassword = ({ password }: { password: string }) => {
    resetPassword({ password, token })
    navigate('/login')
  }

  return (
    <div className={s.formWrapper}>
      <CreateNewPasswordForm onSubmit={handleResetPassword} />
    </div>
  )
}
