import { useForm } from 'react-hook-form'

import {
  Button,
  FormInput,
  ImageUploader,
  Typography,
  cardAddScheme,
  cardEditScheme,
} from '@/components'
import { CardResponse } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import s from './card-form.module.scss'

type DataConfirm = 'add' extends CardFormProps['variant']
  ? z.infer<typeof cardAddScheme>
  : z.infer<typeof cardEditScheme>
type FieldNames = 'answer' | 'answerImg' | 'question' | 'questionImg'

type CardFormProps = {
  card: CardResponse
  handleDataConfirm: (data: DataConfirm) => void
  handleOpenChange: (isOpen: boolean) => void
  variant: 'add' | 'edit'
}

export const CardForm = ({ card, handleDataConfirm, handleOpenChange, variant }: CardFormProps) => {
  const { control, handleSubmit, reset, setValue } = useForm<DataConfirm>({
    defaultValues: {
      answer: card?.answer ? card.answer : '',
      answerImg: null,
      question: card?.question ? card.question : '',
      questionImg: null,
    },
    resolver: zodResolver(variant === 'edit' ? cardEditScheme : cardAddScheme),
  })

  const handleFileChange = (fieldName: FieldNames) => (file: File | null) => {
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
  }

  const handleCancel = () => {
    handleOpenChange(false)
    reset()
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
          card={card}
          handleChangeFile={handleFileChange('questionImg')}
          imageKey={'questionImg'}
        />
      </div>
      <div className={s.answerSection}>
        <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
          Answer:
        </Typography>
        <FormInput control={control} label={'Answer'} name={'answer'} />
        <ImageUploader
          card={card}
          handleChangeFile={handleFileChange('answerImg')}
          imageKey={'answerImg'}
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
