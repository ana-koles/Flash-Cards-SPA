import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Typography } from '@/components/ui/typography'
import { SignUpData } from '@/pages/signUp-page'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button } from '../../ui/button'
import { FormInput } from '../../ui/controlled/form-input'

const emailSchema = z.string().email()

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(5),
    email: emailSchema,
    password: z.string().min(5),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>

type SignUpProps = {
  handleSignUp: (data: SignUpData) => void
  validationError?: string
}

export const SignUp = ({ handleSignUp, validationError }: SignUpProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = ({ confirmPassword, ...restData }: FormValues) => {
    handleSignUp(restData)
  }

  return (
    <div className={s.form}>
      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.titleSignUp} variant={'h1'}>
          Sign Up
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
        <div className={s.input}>
          <FormInput
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            placeholder={'Confirm Password'}
            type={'password'}
          />
        </div>
        {validationError && (
          <div className={s.error}>
            <Typography as={'span'} variant={'body1'}>
              {validationError}
            </Typography>
          </div>
        )}
        <div className={s.submitBtn}>
          <Button fullWidth type={'submit'}>
            Sign Up
          </Button>
        </div>
        <div className={s.haveAcc}>Already have an account?</div>
        <div className={s.signIn}>
          <Link to={'/login'}>Sign In</Link>
        </div>
      </form>
    </div>
  )
}
