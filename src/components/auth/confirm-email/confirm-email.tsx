import { Link } from 'react-router-dom'

import { CheckEmail } from '@/assets'
import { Card, Typography } from '@/components'

import s from './confirm-email.module.scss'

export const ConfirmEmailModal = () => {
  const classNames = {
    card: s.card,
    iconContainer: s.iconContainer,
    instructions: s.instructions,
    title: s.title,
  }

  return (
    <Card as={'div'} className={classNames.card}>
      <Typography as={'h1'} className={classNames.title} variant={'h1'}>
        Email confirmed
      </Typography>
      <div className={classNames.iconContainer}>
        <CheckEmail />
      </div>
      <Typography className={classNames.instructions} variant={'body2'}>
        Your email has been confirmed
      </Typography>
      <Link className={s.link} to={'/login'}>
        Back to Sign In
      </Link>
    </Card>
  )
}
