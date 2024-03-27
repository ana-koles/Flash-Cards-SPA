import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ModalContent, ModalRoot } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './delete-deck-modal.module.scss'

type Deck = {
  id: string
  name: string
}

type DeleteDeckModuleProps = {
  children: ReactNode
  deck: Deck
  handleDeckDelete: (id: string) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const DeleteDeckModule = ({
  deck,
  handleDeckDelete,
  onOpenChange,
  open,
  ...restProps
}: DeleteDeckModuleProps) => {
  const handleDelete = () => {
    handleDeckDelete(deck.id)
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
      <ModalContent className={classNames.modalWrapper} modalTitle={'Delete Deck'}>
        <Typography variant={'body1'}>Do you really want to remove {deck.name}?</Typography>
        <div className={s.buttonWrapper}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete}>Delete Deck</Button>
        </div>
      </ModalContent>
    </ModalRoot>
  )
}
