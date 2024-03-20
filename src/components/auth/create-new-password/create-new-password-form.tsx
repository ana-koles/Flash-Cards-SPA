import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/ui/input/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

type FormValues = z.infer<typeof passwordSchema>
type Props = {
  onSubmit: (data: FormValues) => void
}

const passwordSchema = z.object({
  password: z.string().min(5),
})

export const CreateNewPasswordForm = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(passwordSchema) })

  return (
    <Card as={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Typography as={'h1'} variant={'h1'}>
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
      <Typography variant={'body2'}>
        Create new password and we will send you further instructions to email
      </Typography>
      <Button fullWidth type={'submit'}>
        Create New Password
      </Button>
    </Card>
  )
}
