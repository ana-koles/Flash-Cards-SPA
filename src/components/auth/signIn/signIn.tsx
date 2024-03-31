// import { CheckboxForm } from '@/components/ui/'
import { useForm } from 'react-hook-form'

import { FormCheckbox } from '@/components/ui/checkbox/form-checkbox'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signIn.module.scss'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input/input'

const emailSchema = z.string().trim().email()

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(3),
  rememberMe: z.literal(true), //update to boolean
})

export type FormValues = z.infer<typeof loginSchema>

type SignInProps = {
  handleSignIn: (data: FormValues) => void
}

export const SignIn = ({ handleSignIn }: SignInProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    handleSignIn(data)
  }

  return (
    <div className={s.form}>
      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.titleSignIn} variant={'h1'}>
          Sign In
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
        <div className={s.checkbox}>
          {/*<CheckboxForm control={control} label={'Remember me'} name={'rememberMe'} />*/}
          <FormCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
        </div>
        <div className={s.forgotPassword}>Forgot password?</div>
        <div className={s.submit}>
          <Button fullWidth type={'submit'}>
            Sign In
          </Button>
        </div>
        <div className={s.noAccount}>Don`t have an account?</div>
        <div className={s.signUp}>
          <a>Sign Up</a>
        </div>
      </form>
    </div>
  )
}
