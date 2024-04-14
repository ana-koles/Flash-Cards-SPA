import { ChangeEvent, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImgIcon } from '@/assets/icons/img'
import defaultCardImg from '@/assets/images/defaultCardImg.png'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/input/form-input'
import { CommonModal } from '@/components/ui/modal/common-modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-card-modal.module.scss'

type DataConfirm = FormValues & Files

type AddCardModalProps = {
  children: ReactNode
  defaultValues?: FormValues
  handleDataConfirm: (data: DataConfirm) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

type Files = {
  answerImg: File | null
  questionImg: File | null
}

const cardScheme = z.object({
  answer: z.string().trim().min(5).max(1000),
  question: z.string().trim().min(5).max(1000),
})

type FormValues = z.infer<typeof cardScheme>

export const AddCardModal = ({
  defaultValues = { answer: '', question: '' },
  handleDataConfirm,
  onOpenChange,
  ...restProps
}: AddCardModalProps) => {
  const [files, setFiles] = useState<Files>({
    answerImg: null,
    questionImg: null,
  })

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(cardScheme),
  })

  const handleFileLoading = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (file) {
        setFiles(prevFiles => ({ ...prevFiles, [fieldName]: file }))
      }
    }
  }

  const onSubmit = (data: FormValues) => {
    handleDataConfirm({ ...files, ...data })
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
    <CommonModal modalTitle={'Add New Card'} onOpenChange={onOpenChange} {...restProps}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.questionSection}>
          <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
            Question:
          </Typography>
          <FormInput control={control} defaultValue={''} label={'Question'} name={'question'} />
          <div className={s.imgWrapper}>
            <img
              src={
                files['questionImg'] ? URL.createObjectURL(files['questionImg']) : defaultCardImg
              }
            />
          </div>
          <div className={s.fileInputWrapper}>
            <label className={s.fileInputBtn} htmlFor={'questionImg'}>
              <ImgIcon />
              Change Image
            </label>
            <input
              id={'questionImg'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileLoading(e, 'questionImg')}
              type={'file'}
            />
          </div>
        </div>
        <div className={s.answerSection}>
          <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
            Answer:
          </Typography>
          <FormInput control={control} defaultValue={''} label={'Answer'} name={'answer'} />
          <div className={s.imgWrapper}>
            <img
              src={files['answerImg'] ? URL.createObjectURL(files['answerImg']) : defaultCardImg}
            />
          </div>
          <div className={s.fileInputWrapper}>
            <label className={s.fileInputBtn} htmlFor={'answerImg'}>
              <ImgIcon />
              Change Image
            </label>
            <input
              id={'answerImg'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileLoading(e, 'answerImg')}
              type={'file'}
            />
          </div>
        </div>
        <div className={s.buttonWrapper}>
          <Button onClick={handleCancel} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'}>Add New Card</Button>
        </div>
      </form>
    </CommonModal>
  )
}
