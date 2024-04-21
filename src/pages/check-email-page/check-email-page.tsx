import { useLocation } from 'react-router-dom'

import { CheckEmailForm } from '@/components/auth/check-email-form'
import { FormWrapper } from '@/components/common/form-wrapper'

export const CheckEmailPage = () => {
  const location = useLocation()
  const email = location.state?.email

  return (
    <FormWrapper>
      <CheckEmailForm email={email} />
    </FormWrapper>
  )
}
