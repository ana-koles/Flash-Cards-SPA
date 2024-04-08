import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { FormCheckbox } from '@/components/ui/checkbox/form-checkbox'
import { FormInput } from '@/components/ui/input/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signIn.module.scss'

import { Button } from '../../ui/button'

const emailSchema = z.string().trim().email()

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

export type FormValues = z.infer<typeof loginSchema>

type SignInProps = {
  handleSignIn: (data: FormValues) => void
  validationError?: string
}

export const SignIn = ({ handleSignIn, validationError }: SignInProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
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
          <FormInput
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'example@gmail.com'}
            type={'email'}
          />
        </div>
        <div className={s.input}>
          <FormInput
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'jk34!@#GF'}
            type={'password'}
          />
        </div>
        <div className={s.checkbox}>
          <FormCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
        </div>
        <Link className={s.forgotPassword} to={'/password'}>
          Forgot password?
        </Link>
        {validationError && <div className={s.error}>{validationError}</div>}
        <div className={s.submit}>
          <Button fullWidth type={'submit'}>
            Sign In
          </Button>
        </div>
        <div className={s.noAccount}>Don`t have an account?</div>
        <div className={s.signUp}>
          <Link to={'/signUp'}>Sign Up</Link>
        </div>
      </form>
    </div>
  )
}
