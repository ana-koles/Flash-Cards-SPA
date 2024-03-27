import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/input/form-input'
import { ModalContent, ModalRoot } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-card-modal.module.scss'

type AddCardModalProps = {
  children: ReactNode
  defaultValues?: FormValues
  handleDataConfirm: (data: FormValues) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

const cardScheme = z.object({
  answer: z.string().trim(),
  question: z.string().trim(),
})

type FormValues = z.infer<typeof cardScheme>

export const AddCardModal = ({
  defaultValues = { answer: 'aaa', question: 'qqq' },
  handleDataConfirm,
  onOpenChange,
  open,
  ...restProps
}: AddCardModalProps) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(cardScheme),
  })

  const onSubmit = (data: FormValues) => {
    handleDataConfirm(data)
    onOpenChange(false)
    reset()
  }

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
            <input type={'file'} />
            <Button fullWidth>
              {/* <img alt={'card img'} src={defaultCardImg} /> */}
              Change Image
            </Button>
          </div>
          <div className={s.answerSection}>
            <Typography as={'span'} className={classNames.title} variant={'subtitle2'}>
              Answer:
            </Typography>
            <FormInput control={control} defaultValue={''} label={'Answer'} name={'answer'} />
            <input type={'file'} />
            <Button fullWidth>
              {/* <img alt={'card img'} src={defaultCardImg} /> */}
              Change Image
            </Button>
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
