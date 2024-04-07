import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LogOutIcon } from '@/assets/icons'
import defaultAvatar from '@/assets/images/defaultAvatar.jpg'
import { UpdateUserDataArgs } from '@/services/auth/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './from_personal-info.module.scss'

import { Button } from '../button'
import { Card } from '../card'
import { FormInput } from '../input/form-input'
import { Typography } from '../typography'

type PersonalInfoFormProps = {
  avatar?: File
  email?: string
  name?: string
  updateUserData: (data: UpdateUserDataArgs) => void
}

export const personalInfoSchema = z.object({
  name: z.string().trim(),
})

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

export const PersonalInfoForm = ({
  avatar,
  email,
  name,
  updateUserData,
}: PersonalInfoFormProps) => {
  const { control, handleSubmit } = useForm<PersonalInfoFormValues>({
    defaultValues: {
      name,
    },
    resolver: zodResolver(personalInfoSchema),
  })

  console.log('avatar', avatar)

  const [editMode, setEditMode] = useState<boolean>(false)
  const [userAvatar, setUserAvatar] = useState<File | null>(null)
  const navigate = useNavigate()

  const updateAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setUserAvatar(e.target.files[0])
    }
  }

  const onSubmit = (data: PersonalInfoFormValues) => {
    const newUserData: UpdateUserDataArgs = {
      avatar: userAvatar,
      name: data.name,
    }

    updateUserData(newUserData)
    setEditMode(false)
  }

  const handleSetEditMode = () => {
    setEditMode(true)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  const createSrc = () => {
    if (userAvatar) {
      return URL.createObjectURL(userAvatar)
    }
    if (avatar) {
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
        {editMode ? (
          <>
            <div className={s.avatarSection}>
              <img alt={'avatar'} className={s.avatar} src={createSrc()} />

              <div className={s.avatarInputWrapper}>
                <label className={s.fileInputBtn} htmlFor={'avatar'}>
                  <Typography as={'span'} variant={'body2'}>
                    Upload Image
                  </Typography>
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

            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <FormInput control={control} defaultValue={name} label={'Nickname'} name={'name'} />
              <Button fullWidth type={'submit'}>
                Save Changes
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className={s.avatarSection}>
              <img alt={'avatar'} className={s.avatar} src={createSrc()} />
            </div>
            <div className={s.personalDataWrapper}>
              <Typography className={s.nickName} onDoubleClick={handleSetEditMode} variant={'h2'}>
                {name}
              </Typography>
              <Typography className={s.email} variant={'body2'}>
                {email}
              </Typography>
              <Button onClick={handleLogout} variant={'secondary'}>
                <LogOutIcon />
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
