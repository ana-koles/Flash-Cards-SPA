import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/ui/input/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import s from './create-new-password-form.module.scss'

export type CreateNewPasswordFormValues = z.infer<typeof passwordSchema>
type Props = {
  onSubmit: (data: CreateNewPasswordFormValues) => void
}

const passwordSchema = z.object({
  password: z.string().min(5),
})

export const CreateNewPasswordForm = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewPasswordFormValues>({ resolver: zodResolver(passwordSchema) })

  const classNames = {
    card: s.card,
    instructions: s.instructions,
    title: s.title,
  }

  return (
    <Card as={'form'} className={classNames.card} onSubmit={handleSubmit(onSubmit)}>
      <Typography as={'h1'} className={classNames.title} variant={'h1'}>
        Create new password
      </Typography>
      <FormInput
        control={control}
        errorMessage={errors.password?.message}
        label={'Password'}
        name={'password'}
        placeholder={'password'}
        type={'password'}
      />
      <Typography className={classNames.instructions} variant={'body2'}>
        Create new password and we will send you further instructions to email
      </Typography>
      <Button fullWidth type={'submit'}>
        Create New Password
      </Button>
    </Card>
  )
}
