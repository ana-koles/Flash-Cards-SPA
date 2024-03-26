import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { ImgIcon } from '@/assets/icons/img'
import { Button } from '@/components/ui/button'
import { FromCheckbox } from '@/components/ui/checkbox/form-checkbox'
import { FormInput } from '@/components/ui/input/form-input'
import { ModalContent, ModalRoot } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-deck-modal.module.scss'

const deckSchema = z.object({
  deckName: z.string().trim(),
  privatePack: z.boolean(),
})

type AddDeckFormValues = z.infer<typeof deckSchema>

type AddDeckModalProps = {
  children: ReactNode
  handleDataConfirm: (data: AddDeckFormValues) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const AddDeckModal = ({
  handleDataConfirm,
  onOpenChange,
  open,
  ...restProps
}: AddDeckModalProps) => {
  const { control, handleSubmit, reset } = useForm<AddDeckFormValues>({
    resolver: zodResolver(deckSchema),
  })

  const onSubmit = (data: AddDeckFormValues) => {
    handleDataConfirm(data)
    onOpenChange(false)
    reset()
  }

  const handleClose = () => {
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
            label={'Deck Name'}
            name={'deckName'}
          />
          <Button className={s.imgBtn} fullWidth variant={'secondary'}>
            <ImgIcon />
            <Typography as={'span'} variant={'subtitle2'}>
              Update Image
            </Typography>
          </Button>
          <FromCheckbox control={control} label={'Private Deck'} name={'privatePack'} />
          <div className={s.buttonWrapper}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type={'submit'}>Add New Deck</Button>
          </div>
        </form>
      </ModalContent>
    </ModalRoot>
  )
}
