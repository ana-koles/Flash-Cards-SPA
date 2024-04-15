import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import defaultImg from '@/assets/defaultCardImg.png'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/input/form-input'
import { ModalContent, ModalRoot, ModalTrigger } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-card-modal.module.scss'

import { ImageUploader } from '../image-uploader/image-uploader'

type DataConfirm = FormValues & Files

type AddCardModalProps = {
  defaultValues?: FormValues
  handleDataConfirm: (data: DataConfirm) => void
}

type Files = {
  answerImg: File | null
  questionImg: File | null
}

const cardScheme = z.object({
  answer: z.string().trim().min(3).max(1000),
  question: z.string().trim().min(3).max(1000),
})

type FormValues = z.infer<typeof cardScheme>

export const AddCardModal = ({
  defaultValues = { answer: '', question: '' },
  handleDataConfirm,
  ...rest
}: AddCardModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState<Files>({
    answerImg: null,
    questionImg: null,
  })

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(cardScheme),
  })

  const handleFileChange = (fieldName: string) => (file: File | null) => {
    setFiles(prevFiles => ({ ...prevFiles, [fieldName]: file }))
  }

  const onSubmit = (data: FormValues) => {
    handleDataConfirm({ ...files, ...data })
    reset()
    setFiles({ answerImg: null, questionImg: null })
    setIsOpen(false)
  }

  const handleCancel = () => {
    reset()
    setFiles({ answerImg: null, questionImg: null })
    setIsOpen(false)
  }

  const classNames = {
    title: s.title,
  }

  return (
    <ModalRoot {...rest} onOpenChange={setIsOpen} open={isOpen}>
      <ModalTrigger asChild>
        <Button>Add New Card</Button>
      </ModalTrigger>
      <ModalContent modalTitle={'Add New Card'}>
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
            <Button type={'submit'}>Add New Card</Button>
          </div>
        </form>
      </ModalContent>
    </ModalRoot>
  )
}
