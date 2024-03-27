import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ModalContent, ModalRoot } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './delete-card-modal.module.scss'

type Card = {
  id: string
  name: string
}

type DeleteCardModuleProps = {
  card: Card
  children: ReactNode
  handleCardDelete: (id: string) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const DeleteCardModule = ({
  card,
  handleCardDelete,
  onOpenChange,
  open,
  ...restProps
}: DeleteCardModuleProps) => {
  const handleDelete = () => {
    handleCardDelete(card.id)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  const classNames = {
    modalWrapper: s.modalWrapper,
  }

  return (
    <ModalRoot {...restProps} onOpenChange={onOpenChange} open={open}>
      <ModalContent className={classNames.modalWrapper} modalTitle={'Delete Card'}>
        <Typography variant={'body1'}>Do you really want to remove {card.name}?</Typography>
        <div className={s.buttonWrapper}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete}>Delete Card</Button>
        </div>
      </ModalContent>
    </ModalRoot>
  )
}
