import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { BackArrowIcon } from '@/assets/icons'
import defaultAvatar from '@/assets/images/defaultAvatar.jpg'
import { useUpdateUserDataMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './from_personal-info.module.scss'

import { Button } from '../button'
import { Card } from '../card'
import { FormInput } from '../input/form-input'
import { Typography } from '../typography'

type PersonalInfoFormProps = {
  avatar?: string
  email?: string
  nickName?: string
}

export const personalInfoSchema = z.object({
  nickName: z.string().trim(),
})

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

export const PersonalInfoForm = ({ avatar, email, nickName }: PersonalInfoFormProps) => {
  const { control, handleSubmit } = useForm<PersonalInfoFormValues>({
    defaultValues: {
      nickName: nickName ?? '',
    },
    resolver: zodResolver(personalInfoSchema),
  })

  const [udpateUserData] = useUpdateUserDataMutation()

  const [editMode, setEditMode] = useState<boolean>(false)
  const [userAvatar, setUserAvatar] = useState<File | null | string | undefined>(avatar)

  const onSubmit = (data: PersonalInfoFormValues) => {
    const updatedUserData = {
      avatar: userAvatar ?? defaultAvatar,
      name: data.nickName,
    }

    setEditMode(false)
    udpateUserData(updatedUserData)
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
          <img alt={'avatar'} className={s.avatar} src={avatar ?? defaultAvatar} />
        </div>

        {editMode ? (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              control={control}
              defaultValue={nickName}
              label={'Nickname'}
              name={'nickName'}
            />
            <Button fullWidth type={'submit'}>
              Save Changes
            </Button>
          </form>
        ) : (
          <div className={s.personalDataWrapper}>
            <Typography className={s.nickName} onDoubleClick={handleSetEditMode} variant={'h2'}>
              {nickName}
            </Typography>
            <Typography className={s.email} variant={'body2'}>
              {email}
            </Typography>
            <Button variant={'secondary'}>
              <LogOutIcon />
              Logout
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
