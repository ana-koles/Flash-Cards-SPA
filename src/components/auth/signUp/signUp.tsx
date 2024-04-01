import { useForm } from 'react-hook-form'

import { SignUpData } from '@/components/pages/signUp-page'
import { FormInput } from '@/components/ui/input/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signUp.module.scss'

import { Button } from '../../ui/button'

const emailSchema = z.string().email()

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3),
    email: emailSchema,
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>

type SignUpProps = {
  handleSignUp: (data: SignUpData) => void
}

export const SignUp = ({ handleSignUp }: SignUpProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
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
            placeholder={'email'}
            type={'email'}
          />
        </div>
        <div className={s.input}>
          <FormInput
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'password'}
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
