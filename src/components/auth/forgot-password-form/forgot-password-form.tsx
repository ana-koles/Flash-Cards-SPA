import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/ui/input/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type FormValues = z.infer<typeof emailSchema>
const emailSchema = z.object({
  email: z.string().email(),
})

type Props = {
  onSubmit: (data: FormValues) => void
}

export const ForgotPasswordForm = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
  })

  return (
    <Card as={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Typography as={'h1'} variant={'h1'}>
        Forgot your password?
      </Typography>
      <FormInput
        control={control}
        errorMessage={errors.email?.message}
        label={'email'}
        name={'email'}
        placeholder={'email'}
      />
      <Typography variant={'body2'}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button type={'submit'}>Send Instructions</Button>
      <Typography variant={'body2'}>Did you remember your password?</Typography>
      <a href={'#'}>Try logging in</a>
    </Card>
  )
}
