import { ChangeEvent, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import defaultImg from '@/assets/defaultCardImg.png'
import { ImgIcon } from '@/assets/icons/img'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/input/form-input'
import { CommonModal } from '@/components/ui/modal/common-modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-card-modal.module.scss'

type EditCardModalProps = {
  children: ReactNode
  defaultValues?: DataConfirm
  handleDataConfirm: (data: DataConfirm) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

type Files = Omit<DataConfirm, 'answer' | 'question'>
type DataConfirm = z.infer<typeof cardEditScheme>

const cardEditScheme = z
  .object({
    answer: z.string().trim().max(1000).optional(),
    answerImg: z.instanceof(File).nullable().optional(),
    question: z.string().trim().max(1000).optional(),
    questionImg: z.instanceof(File).nullable().optional(),
  })
  .refine(data => Boolean((data.question && data.answer) || (data.questionImg && data.answerImg)), {
    message: 'At least question and answer or question image and answer image must be provided',
    path: ['question'],
  })
  .refine(data => !data.question || data.question.length >= 3, {
    message: 'If provided, question must be at least 3 characters long',
    path: ['question'],
  })
  .refine(data => !data.answer || data.answer.length >= 3, {
    message: 'If provided, answer must be at least 3 characters long',
    path: ['answer'],
  })

export const EditCardModal = ({
  defaultValues = { answer: '', question: '' },
  handleDataConfirm,
  onOpenChange,
  ...restProps
}: EditCardModalProps) => {
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

  const handleFileLoading = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof Files) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (file) {
        setFiles(prevFiles => ({ ...prevFiles, [fieldName]: file }))
        setValue(fieldName, file)
      }
    }
  }

  const onSubmit = (data: DataConfirm) => {
    handleDataConfirm({
      ...data,
      answerImg: data.answerImg || null,
      questionImg: data.questionImg || null,
    })
    onOpenChange(false)
    reset()
    setFiles({ answerImg: null, questionImg: null })
  }

  const handleCancel = () => {
    onOpenChange(false)
    reset()
    setFiles({ answerImg: null, questionImg: null })
  }

  const classNames = {
    title: s.title,
  }

  return (
    <CommonModal modalTitle={'Edit Card'} onOpenChange={onOpenChange} {...restProps}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.questionSection}>
          <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
            Question:
          </Typography>
          <FormInput control={control} label={'Question'} name={'question'} />
          <div className={s.imgWrapper}>
            <img
              src={files['questionImg'] ? URL.createObjectURL(files['questionImg']) : defaultImg}
            />
          </div>
          <div className={s.fileInputWrapper}>
            <label className={s.fileInputBtn} htmlFor={'questionImg'}>
              <ImgIcon />
              Change Image
            </label>
            <input
              id={'questionImg'}
              name={'questionImg'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileLoading(e, 'questionImg')}
              type={'file'}
            />
          </div>
        </div>
        <div className={s.answerSection}>
          <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
            Answer:
          </Typography>
          <FormInput control={control} label={'Answer'} name={'answer'} />
          <div className={s.imgWrapper}>
            <img src={files['answerImg'] ? URL.createObjectURL(files['answerImg']) : defaultImg} />
          </div>
          <div className={s.fileInputWrapper}>
            <label className={s.fileInputBtn} htmlFor={'answerImg'}>
              <ImgIcon />
              Change Image
            </label>
            <input
              id={'answerImg'}
              name={'answerImg'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileLoading(e, 'answerImg')}
              type={'file'}
            />
          </div>
        </div>
        <div className={s.buttonWrapper}>
          <Button onClick={handleCancel} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'}>Edit Card</Button>
        </div>
      </form>
    </CommonModal>
  )
}
