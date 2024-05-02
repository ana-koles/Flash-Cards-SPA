import { useNavigate, useSearchParams } from 'react-router-dom'

import { ConfirmEmailModal } from '@/components'
import { useVerifyEmailMutation } from '@/services/auth'

export const ConfirmEmailPage = () => {
  debugger
  const [searchParams] = useSearchParams()
  const [verifyEmail] = useVerifyEmailMutation()

  const navigate = useNavigate()

  if (searchParams.has('token')) {
    verifyEmail({ code: searchParams.get('token') ?? '' })
    navigate('/login')
  }

  return (
    <div>
      <ConfirmEmailModal />
    </div>
  )
}
