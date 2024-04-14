import { useLocation, useNavigate } from 'react-router-dom'

import { CreateNewPasswordForm, NewPasswordValues } from '@/components/auth/create-new-password'
import { useResetPasswordMutation } from '@/services/auth'

import s from './create-new-password-page.module.scss'

export const CreateNewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const navigate = useNavigate()

  const query = useLocation().search

  const tokenIndex = query.indexOf('token')
  let token = ''

  if (tokenIndex === -1) {
    navigate('/login')
  } else {
    token = query.substring(tokenIndex + 6)
  }

  const handleResetPassword = (data: NewPasswordValues) => {
    resetPassword({ password: data, token: token })
    navigate('/login')
  }

  return (
    <div className={s.formWrapper}>
      <CreateNewPasswordForm onSubmitNewPassword={handleResetPassword} />
    </div>
  )
}
