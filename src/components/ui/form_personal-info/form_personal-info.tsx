import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../button'
import { Card } from '../card'
import { FormInput } from '../input/form-input'
import { Typography } from '../typography'

export const PersonalInfoSchema = z.object({
  nickName: z.string().trim(),
})

export type PersonalInfoFormValues = z.infer<typeof PersonalInfoSchema>

export const PersonalInfoForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(PersonalInfoSchema),
  })

  const onSubmit = (data: PersonalInfoFormValues) => {
    console.log(data)
  }

  return (
    <Card>
      <Typography variant={'h1'}>Personal Information</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control}
          errorMessage={errors?.nickName?.message}
          label={'Nickname'}
          name={'nickName'}
        />
        <Button>Save Changes</Button>
      </form>
    </Card>
  )
}
