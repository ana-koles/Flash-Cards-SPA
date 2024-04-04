import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { BackArrowIcon } from '@/assets/icons'
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

export const personalInfoSchema = z.object({
  nickName: z.string().trim(),
})

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

export const PersonalInfoForm = ({ nickName }: PersonalInfoFormProps) => {
  const { control, handleSubmit } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
  })

  const [editMode, setEditMode] = useState<boolean>(false)

  const onSubmit = () => {
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
            <FormInput control={control} label={'Nickname'} name={'nickName'} />
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
              j&johnson@gmail.com
            </Typography>
            <Button variant={'secondary'}>
              <BackArrowIcon />
              Logout
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
