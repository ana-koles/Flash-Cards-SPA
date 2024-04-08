import { useLocation } from 'react-router-dom'

import { CheckEmailForm } from '@/components/auth/check-email-form'

import s from './check-email-page.module.scss'

export const CheckEmailPage = () => {
  const location = useLocation()
  const email = location.state?.email

  return (
    <div className={s.formWrapper}>
      <CheckEmailForm email={email} />
    </div>
  )
}
