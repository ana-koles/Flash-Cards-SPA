import { Link } from 'react-router-dom'

import { CheckEmail } from '@/assets'
import { Card, Typography } from '@/components'

import s from './check-email-form.module.scss'

type Props = {
  email: string
}

export const CheckEmailForm = ({ email }: Props) => {
  const classNames = {
    card: s.card,
    iconContainer: s.iconContainer,
    instructions: s.instructions,
    title: s.title,
  }

  return (
    <Card as={'div'} className={classNames.card}>
      <Typography as={'h1'} className={classNames.title} variant={'h1'}>
        Check Email
      </Typography>
      <div className={classNames.iconContainer}>
        <CheckEmail />
      </div>
      <Typography className={classNames.instructions} variant={'body2'}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Link className={s.link} to={'/login'}>
        Back to Sign In
      </Link>
    </Card>
  )
}
