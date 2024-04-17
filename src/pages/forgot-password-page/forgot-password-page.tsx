import { createSearchParams, useNavigate } from 'react-router-dom'

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { usePasswordRecoverMutation } from '@/services/auth'

import s from './forgot-password-page.module.scss'

export const ForgotPasswordPage = () => {
  const [passwordRecover] = usePasswordRecoverMutation()

  const navigate = useNavigate()

  const handlePasswordRecover = async ({ email }: { email: string }) => {
    try {
      await passwordRecover({
        email,
      }).unwrap()

      navigate({ pathname: '/checkEmail', search: `?${createSearchParams({ email })}` })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.formWrapper}>
      <ForgotPasswordForm handlePasswordRecover={handlePasswordRecover} />
    </div>
  )
}
