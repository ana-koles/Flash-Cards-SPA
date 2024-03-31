import { useForm } from 'react-hook-form'

import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signUp.module.scss'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input/input'

const emailSchema = z.string().email()

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(3),
})

export type FormValues = z.infer<typeof loginSchema>

type SignUpProps = {
  handleSignUp: (data: FormValues) => void
}

export const SignUp = ({ handleSignUp }: SignUpProps) => {
  const {
    formState: { errors },
    // control,
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    handleSignUp(data)
  }

  return (
    <div className={s.form}>
      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.titleSignUp} variant={'h1'}>
          Sign Up
        </Typography>
        <div className={s.input}>
          <Input
            placeholder={'email'}
            type={'email'}
            {...register('email')}
            errorMessage={errors.email?.message}
            label={'Email'}
          />
        </div>
        <div className={s.input}>
          <Input
            placeholder={'password'}
            type={'password'}
            {...register('password')}
            errorMessage={errors.password?.message}
            label={'Password'}
          />
        </div>
        <div className={s.input}>
          <Input
            placeholder={'password'}
            type={'password'}
            {...register('password')}
            errorMessage={errors.password?.message}
            label={'Confirm Password'}
          />
        </div>
        <div className={s.forgotPassword}>Forgot password?</div>
        <div className={s.submit}>
          <Button fullWidth type={'submit'}>
            Sign Up
          </Button>
        </div>
        <div className={s.haveAcc}>Already have an account?</div>
        <div className={s.signIn}>
          <a>Sign In</a>
        </div>
      </form>
    </div>
  )
}
