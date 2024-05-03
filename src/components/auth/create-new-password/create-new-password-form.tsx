import { useForm } from 'react-hook-form'

import { Button, Card, FormInput, Typography } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import s from './create-new-password-form.module.scss'

type CreateNewPasswordFormValues = z.infer<typeof passwordSchema>
export type NewPasswordValues = Omit<CreateNewPasswordFormValues, 'confirmPassword'>

type Props = {
  onSubmitNewPassword: (data: NewPasswordValues) => void
}

const passwordSchema = z
  .object({
    confirmPassword: z.string().min(5),
    password: z.string().min(5),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  })

export const CreateNewPasswordForm = ({ onSubmitNewPassword }: Props) => {
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

  const onSubmit = ({ confirmPassword, ...restData }: CreateNewPasswordFormValues) => {
    onSubmitNewPassword(restData)
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
        placeholder={'jk34!@#GF'}
        type={'password'}
      />
      <FormInput
        control={control}
        errorMessage={errors.password?.message}
        label={'Confirm Password'}
        name={'confirmPassword'}
        placeholder={'jk34!@#GF'}
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
