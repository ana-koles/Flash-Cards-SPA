import { useState } from 'react'
import { useForm } from 'react-hook-form'

import defaultImg from '@/assets/defaultCardImg.png'
import { EditIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/input/form-input'
import { ModalContent, ModalRoot, ModalTrigger } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-card-modal.module.scss'

import { cardEditScheme } from '../card-validation'
import { ImageUploader } from '../image-uploader'

type EditCardModalProps = {
  defaultValues?: DataConfirm
  handleDataConfirm: (data: DataConfirm) => void
}

type Files = Omit<DataConfirm, 'answer' | 'question'>
type DataConfirm = z.infer<typeof cardEditScheme>
type FieldName = 'answer' | 'answerImg' | 'question' | 'questionImg'

export const EditCardModal = ({
  defaultValues = { answer: '', question: '' },
  handleDataConfirm,
  ...rest
}: EditCardModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
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
    resolver: zodResolver(cardEditScheme),
  })

  const handleFileChange = (fieldName: FieldName) => (file: File | null) => {
    setFiles(prevFiles => ({ ...prevFiles, [fieldName]: file }))
    setValue(fieldName, file)
  }

  const onSubmit = (data: DataConfirm) => {
    handleDataConfirm({
      ...data,
      answerImg: data.answerImg || null,
      questionImg: data.questionImg || null,
    })
    setIsOpen(false)
    reset()
    setFiles({ answerImg: null, questionImg: null })
  }

  const handleCancel = () => {
    setIsOpen(false)
    reset()
    setFiles({ answerImg: null, questionImg: null })
  }

  const classNames = {
    title: s.title,
  }

  return (
    <ModalRoot {...rest} onOpenChange={setIsOpen} open={isOpen}>
      <ModalTrigger asChild>
        <Button variant={'icon'}>
          <EditIcon />
        </Button>
      </ModalTrigger>
      <ModalContent modalTitle={'Edit Card'}>
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
            <Button type={'submit'}>Edit Card</Button>
          </div>
        </form>
      </ModalContent>
    </ModalRoot>
  )
}
