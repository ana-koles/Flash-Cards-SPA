import { useState } from 'react'

import { TrashIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { ModalContent, ModalRoot, ModalTrigger } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

import s from './delete-card-modal.module.scss'

type Card = {
  id: string
  name: string
}

type DeleteCardModalProps = {
  card: Card
  onDeleteCard: (id: string) => void
}

export const DeleteCardModal = ({ card, onDeleteCard, ...rest }: DeleteCardModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const classNames = {
    modalWrapper: s.modalWrapper,
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const handleDelete = () => {
    onDeleteCard(card.id)
    setIsOpen(false)
  }

  return (
    <ModalRoot {...rest} onOpenChange={setIsOpen} open={isOpen}>
      <ModalTrigger asChild>
        <Button variant={'icon'}>
          <TrashIcon />
        </Button>
      </ModalTrigger>
      <ModalContent className={classNames.modalWrapper} modalTitle={'Delete Card'}>
        <Typography variant={'body1'}>Do you really want to remove {card.name}?</Typography>
        <div className={s.buttonsWrapper}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete}>Delete Card</Button>
        </div>
      </ModalContent>
    </ModalRoot>
  )
}
