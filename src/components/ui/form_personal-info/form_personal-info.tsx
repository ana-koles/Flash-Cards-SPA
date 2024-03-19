import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './from_personal-info.module.scss'

import { Button } from '../button'
import { Card } from '../card'
import { FormInput } from '../input/form-input'
import { Typography } from '../typography'
import avatar from './avatar.png'

type PersonalInfoFormProps = {
  nickName: string
}

export const PersonalInfoSchema = z.object({
  nickName: z.string().trim(),
})

export type PersonalInfoFormValues = z.infer<typeof PersonalInfoSchema>

export const PersonalInfoForm = ({ nickName }: PersonalInfoFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(PersonalInfoSchema),
  })

  const [editMode, setEditMode] = useState<boolean>(false)

  const onSubmit = (data: PersonalInfoFormValues) => {
    console.log(data)
  }

  const handleSaveChanges = () => {
    setEditMode(false)
  }

  const handleSetEditMode = () => {
    setEditMode(true)
  }

  return (
    <Card className={s.container}>
      <div className={s.formWrapper}>
        <div className={s.avatarSection}>
          <Typography className={s.header} variant={'h1'}>
            Personal Information
          </Typography>
          <img alt={'avatar'} className={s.avatar} src={avatar} />
        </div>

        {editMode ? (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              control={control}
              errorMessage={errors?.nickName?.message}
              label={'Nickname'}
              name={'nickName'}
              placeholder={nickName}
            />
            <Button fullWidth onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </form>
        ) : (
          <div className={s.personalDataWrapper}>
            <Typography className={s.nickName} onDoubleClick={handleSetEditMode} variant={'h2'}>
              {nickName}
            </Typography>
            <Typography variant={'body2'}>j&johnson@gmail.com</Typography>
            <Button back variant={'secondary'}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
