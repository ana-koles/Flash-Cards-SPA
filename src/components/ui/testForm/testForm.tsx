import { useController, useForm } from 'react-hook-form'

import { Button } from '../../ui/button'
import { Input } from '../input'

type FormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>()
  //register - объекь, к-ый применяется для регистрации инпута для react-hook-form, внутри него есть ref

  const onSubmit = (data: FormValues) => {
    debugger
    console.log('data', data)
  }

  console.log('errors', errors)

  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: false,
    name: 'rememberMe', //наименование того поля, к-ый мы контролируем
  })

  console.log('register:', register('email'))

  return (
    //под капоном делает e.prevenDefault и Object.fromEntries(new FormData(e.target))
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email', {
          required: 'Email is required',
          // eslint-disable-next-line perfectionist/sort-objects
          pattern: { message: 'Invalid email', value: emailRegex },

        })}
        errorMessage={errors?.email?.message}
        label={'email'}
      />

      <Input
        {...register('password', {
          required: 'Password is required',
          // eslint-disable-next-line perfectionist/sort-objects
          maxLength: { message: 'Password has to be max 10 characters', value: 10 },
          minLength: { message: 'Password has to be at least 3 characters long', value: 3 },

        })}
        errorMessage={errors?.password?.message}
        label={'password'}
      />

      <Button type={'submit'}>Submit</Button>
      {/* <Checkbox checked={value} onValueChange={onChange} label={'remember me'} /> */}
    </form>
  )
}

const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
