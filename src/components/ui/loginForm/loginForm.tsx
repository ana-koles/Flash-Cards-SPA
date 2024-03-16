import { useController, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { Input } from '../input'

const emailSchema = z.string().trim().email() //можно сделать схему для каждого поля и передать как переменную в общую схему формы

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(3),
  /* rememberMe: z.boolean().optional(), */
  rememberMe: z.literal(true), // допускается только значение true
})

const _loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

/* type _FormValues = {
  email: string
  password: string
  rememberMe: boolean
} */

type FormValues = z.infer<typeof loginSchema> //типизируем поля формы

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  }) //register - д/регистрации инпутов для react-hock-form
  //react-hook-form из каждого инпута вытаскивает value, а для этого ему нужны ref. У самого register нет value
  //Он использует ref, чтобы получить значение, чтобы не перерисовывать форму

  const onSubmit = (data: FormValues) => {
    //попадем только если форма валидная
    console.log(data)
  }

  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    /* defaultValue: false, */
    name: 'rememberMe', //название поля за к-ым мы следим
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* вместо options в register передаем валидационную схему */}
      <Input {...register('email')} errorMessage={errors?.email?.message} label={'email'} />
      <Input
        {...register('password')}
        errorMessage={errors?.password?.message}
        label={'password'}
      />
      <Checkbox checked={value} label={'Remember me'} onCheckedChange={onChange} ref={ref} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}

const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
