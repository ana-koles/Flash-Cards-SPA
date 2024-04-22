import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { LogOutIcon } from '@/assets/icons'
import { ChangeImg } from '@/assets/icons/changeImg'
import { EditText } from '@/assets/icons/editText'
import defaultAvatar from '@/assets/images/defaultAvatar.jpg'
import { UpdateUserDataArgs } from '@/services/auth/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './form_personal-info.module.scss'

import { Button } from '../button'
import { Card } from '../card'
import { FormInput } from '../controlled/form-input'
import { Typography } from '../typography'

type PersonalInfoFormProps = {
  avatar?: string
  email?: string
  handleLogout: () => void
  handleUserUpdateData: (data: UpdateUserDataArgs) => void
  name?: string
}

export const personalInfoSchema = z.object({
  name: z.string().trim().optional(),
})

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

export const PersonalInfoForm = ({
  avatar,
  email,
  handleLogout,
  handleUserUpdateData,
  name,
}: PersonalInfoFormProps) => {
  const { control, handleSubmit } = useForm<PersonalInfoFormValues>({
    defaultValues: {
      name,
    },
    resolver: zodResolver(personalInfoSchema),
  })

  const [editMode, setEditMode] = useState<boolean>(false)
  const [userAvatar, setUserAvatar] = useState<File | null>(null)

  const updateAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setUserAvatar(e.target.files[0])
    }
  }

  const onSubmit = (data: PersonalInfoFormValues) => {
    const newUserData: UpdateUserDataArgs = {
      avatar: userAvatar,
      name: data.name ?? name,
    }

    handleUserUpdateData(newUserData)
    setEditMode(false)
  }

  const handleSetEditMode = () => {
    setEditMode(true)
  }

  const createSrc = () => {
    if (userAvatar) {
      return URL.createObjectURL(userAvatar)
    }
    if (typeof avatar === 'string') {
      return avatar
    }

    return defaultAvatar
  }

  return (
    <Card className={s.container}>
      <div className={s.formWrapper}>
        <Typography className={s.header} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={s.avatarSection}>
          <img alt={'avatar'} className={s.avatar} src={createSrc()} />
          <div className={s.avatarInputWrapper}>
            <label className={s.fileInputBtn} htmlFor={'avatar'}>
              <ChangeImg />
            </label>
            <input
              className={s.photoInput}
              id={'avatar'}
              name={'avatar'}
              onChange={updateAvatarHandler}
              type={'file'}
            />
          </div>
        </div>
        {editMode ? (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput control={control} defaultValue={name} label={'Nickname'} name={'name'} />
            <Button fullWidth type={'submit'}>
              Save Changes
            </Button>
          </form>
        ) : (
          <div className={s.personalDataWrapper}>
            <div className={s.nameWrapper}>
              <Typography className={s.nickName} variant={'h2'}>
                {name}
              </Typography>
              <button onClick={handleSetEditMode}>
                <EditText />
              </button>
            </div>
            <Typography className={s.email} variant={'body2'}>
              {email}
            </Typography>
            <Button onClick={handleLogout} variant={'secondary'}>
              <LogOutIcon />
              Logout
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
