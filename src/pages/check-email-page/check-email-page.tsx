import { useLocation } from 'react-router-dom'

import { CheckEmailForm } from '@/components/auth/check-email-form'

export const CheckEmailPage = () => {
  const location = useLocation()
  const email = location.state?.email

  return (
    <div>
      <CheckEmailForm email={email} />
    </div>
  )
}
