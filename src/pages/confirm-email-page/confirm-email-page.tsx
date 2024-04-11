import { useNavigate } from 'react-router-dom'

import { ConfirmEmailModal } from '@/components/auth/confirm-email'
import { useVerifyEmailMutation } from '@/services/auth'

export const ConfirmEmailPage = () => {
  debugger
  const [verifyEmail] = useVerifyEmailMutation()
  const params = new URLSearchParams(window.location.search)
  const navigate = useNavigate()

  if (params.has('token')) {
    verifyEmail({ code: params.get('token') ?? '' })
    navigate('/login')
  }

  return (
    <div>
      <ConfirmEmailModal />
    </div>
  )
}
