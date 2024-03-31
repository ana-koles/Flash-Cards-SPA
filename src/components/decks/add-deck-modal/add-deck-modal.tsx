import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { ImgIcon } from '@/assets/icons/img'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/checkbox/form-checkbox'
import { FormInput } from '@/components/ui/input/form-input'
import { ModalContent, ModalRoot } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-deck-modal.module.scss'

type AddDeckModalProps = {
  children: ReactNode
  defaultValues?: FormValues
  handleDataConfirm: (data: FormValues) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

const deckScheme = z.object({
  isPrivate: z.boolean(),
  name: z.string().trim().min(2).max(500),
})

type FormValues = z.infer<typeof deckScheme>

export const AddDeckModal = ({
  defaultValues = { isPrivate: false, name: '' },
  handleDataConfirm,
  onOpenChange,
  open,
  ...restProps
}: AddDeckModalProps) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(deckScheme),
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
    inputLabel: s.inputLabel,
  }

  return (
    <ModalRoot {...restProps} onOpenChange={onOpenChange} open={open}>
      <ModalContent modalTitle={'Add New Deck'}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            className={classNames.inputLabel}
            control={control}
            defaultValue={defaultValues.name}
            label={'Deck name'}
            name={'name'}
          />
          <Button className={s.imgBtn} fullWidth variant={'secondary'}>
            <ImgIcon />
            <Typography as={'span'} variant={'subtitle2'}>
              Update Image
            </Typography>
          </Button>
          <FormCheckbox control={control} label={'Private Deck'} name={'isPrivate'} />
          <div className={s.buttonWrapper}>
            <Button onClick={handleCancel} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'}>Add New Deck</Button>
          </div>
        </form>
      </ModalContent>
    </ModalRoot>
  )
}
