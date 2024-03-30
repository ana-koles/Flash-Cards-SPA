import { ChangeEvent, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import defaultImg from '@/assets/defaultCardImg.png'
import { ImgIcon } from '@/assets/icons/img'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/input/form-input'
import { ModalContent, ModalRoot } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-card-modal.module.scss'
/*
//for 1 file
type AddCardModalProps = {
  children: ReactNode
  defaultValues?: FormValues
  handleDataConfirm: (data: FormValues & { cover?: File }) => void
  onOpenChange: (open: boolean) => void
  open: boolean
} */

//type for arg for handleDataConfirm
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
  answer: z.string().trim(),
  question: z.string().trim(),
})

type FormValues = z.infer<typeof cardScheme>

export const AddCardModal = ({
  defaultValues = { answer: '', question: '' },
  handleDataConfirm,
  onOpenChange,
  open,
  ...restProps
}: AddCardModalProps) => {
  const [files, setFiles] = useState<Files>({
    answerImg: null,
    questionImg: null,
  })
  /* const [file, setFile] = useState<File | null>(null) */

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
  }

  /*   const handleFileLoading = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0])
      console.log(e.target.files[0])
    }
  }

  const onSubmit = (data: FormValues) => {
    handleDataConfirm({ cover: file ?? undefined, ...data })
    onOpenChange(false)
    reset()
  } */

  const handleCancel = () => {
    onOpenChange(false)
    reset()
  }

  const classNames = {
    title: s.title,
  }

  return (
    <ModalRoot {...restProps} onOpenChange={onOpenChange} open={open}>
      <ModalContent modalTitle={'Add New Card'}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.questionSection}>
            <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
              Question:
            </Typography>
            <FormInput control={control} defaultValue={''} label={'Question'} name={'question'} />
            <div className={s.imgWrapper}>
              {/*  <img src={file ? URL.createObjectURL(file) : defaultImg} /> */}
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
      </ModalContent>
    </ModalRoot>
  )
}
