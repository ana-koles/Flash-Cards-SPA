import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/ui/input/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password-form.module.scss'

type FormValues = z.infer<typeof emailSchema>
const emailSchema = z.object({
  email: z.string().email(),
})

type Props = {
  handlePasswordRecover: (data: FormValues) => void
}

export const ForgotPasswordForm = ({ handlePasswordRecover }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
  })

  const classNames = {
    card: s.card,
    instructions: s.instructions,
    link: s.link,
    question: s.question,
    title: s.title,
  }

  const onSubmit = (data: FormValues) => {
    handlePasswordRecover(data)
  }

  return (
    <Card as={'form'} className={classNames.card} onSubmit={handleSubmit(onSubmit)}>
      <Typography as={'h1'} className={classNames.title} variant={'h1'}>
        Forgot your password?
      </Typography>
      <FormInput
        control={control}
        errorMessage={errors.email?.message}
        label={'Email'}
        name={'email'}
        placeholder={'example@gmail.com'}
      />
      <Typography className={classNames.instructions} variant={'body2'}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button fullWidth type={'submit'}>
        Send Instructions
      </Button>
      <Typography className={classNames.question} variant={'body2'}>
        Did you remember your password?
      </Typography>
      <a className={classNames.link} href={'#'}>
        Try logging in
      </a>
    </Card>
  )
}
