import { useState } from 'react'
import { useForm } from 'react-hook-form'

import defaultImg from '@/assets/images/defaultImg.png'
import {
  cardAddScheme,
  cardEditScheme,
} from '@/components/decks/cards/card-validation/card-validation'
import { ImageUploader } from '@/components/decks/cards/image-uploader/image-uploader'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import s from './card-form.module.scss'

import { FormInput } from '../../../ui/controlled/form-input'

type Files = Omit<DataConfirm, 'answer' | 'question'>
type DataConfirm = 'add' extends CardFormProps['variant']
  ? z.infer<typeof cardAddScheme>
  : z.infer<typeof cardEditScheme>
type FieldNames = 'answer' | 'answerImg' | 'question' | 'questionImg'

type CardFormProps = {
  handleDataConfirm: (data: DataConfirm) => void
  handleOpenChange: (isOpen: boolean) => void
  variant: 'add' | 'edit'
}

export const CardForm = ({ handleDataConfirm, handleOpenChange, variant }: CardFormProps) => {
  const [files, setFiles] = useState<Files>({
    answerImg: null,
    questionImg: null,
  })

  const { control, handleSubmit, reset, setValue } = useForm<DataConfirm>({
    defaultValues: {
      answer: '',
      answerImg: null,
      question: '',
      questionImg: null,
    },
    resolver: zodResolver(variant === 'edit' ? cardEditScheme : cardAddScheme),
  })

  const handleFileChange = (fieldName: FieldNames) => (file: File | null) => {
    setFiles(prevFiles => ({ ...prevFiles, [fieldName]: file }))
    setValue(fieldName, file)
  }

  const onSubmit = (data: DataConfirm) => {
    handleDataConfirm({
      ...data,
      answerImg: data.answerImg || null,
      questionImg: data.questionImg || null,
    })
    handleOpenChange(false)
    reset()
    setFiles({ answerImg: null, questionImg: null })
  }

  const handleCancel = () => {
    handleOpenChange(false)
    reset()
    setFiles({ answerImg: null, questionImg: null })
  }

  const classNames = {
    title: s.title,
  }

  const buttonName =
    variant[0].toUpperCase() + variant.slice(1) + (variant === 'add' ? ' New Card' : ' Card')

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.questionSection}>
        <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
          Question:
        </Typography>
        <FormInput control={control} label={'Question'} name={'question'} />
        <ImageUploader
          handleChangeFile={handleFileChange('questionImg')}
          id={'questionImg'}
          src={files['questionImg'] ? URL.createObjectURL(files['questionImg']) : defaultImg}
        />
      </div>
      <div className={s.answerSection}>
        <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
          Answer:
        </Typography>
        <FormInput control={control} label={'Answer'} name={'answer'} />
        <ImageUploader
          handleChangeFile={handleFileChange('answerImg')}
          id={'answerImg'}
          src={files['answerImg'] ? URL.createObjectURL(files['answerImg']) : defaultImg}
        />
      </div>
      <div className={s.buttonWrapper}>
        <Button onClick={handleCancel} variant={'secondary'}>
          Cancel
        </Button>
        <Button type={'submit'}>{buttonName}</Button>
      </div>
    </form>
  )
}
