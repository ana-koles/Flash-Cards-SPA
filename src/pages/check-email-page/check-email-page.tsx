import { useLocation } from 'react-router-dom'

import { CheckEmailForm } from '@/components'
import { FormWrapper } from '@/components/common'

export const CheckEmailPage = () => {
  const location = useLocation()
  const email = location.state?.email

  return (
    <FormWrapper>
      <CheckEmailForm email={email} />
    </FormWrapper>
  )
}
