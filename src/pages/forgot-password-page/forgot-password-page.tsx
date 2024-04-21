import { createSearchParams, useNavigate } from 'react-router-dom'

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { FormWrapper } from '@/components/common/form-wrapper'
import { usePasswordRecoverMutation } from '@/services/auth'

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
    <FormWrapper>
      <ForgotPasswordForm handlePasswordRecover={handlePasswordRecover} />
    </FormWrapper>
  )
}
