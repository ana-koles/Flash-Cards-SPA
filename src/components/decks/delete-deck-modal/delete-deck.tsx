import { ReactNode } from 'react'

import { Button, ModalContent, ModalRoot, Typography } from '@/components'

import s from './delete-deck-modal.module.scss'

type DeleteDeckModuleProps = {
  children?: ReactNode
  deckName: string
  handleDeckDelete: (id: string) => void
  id: string
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const DeleteDeckModule = ({
  deckName,
  handleDeckDelete,
  id,
  onOpenChange,
  open,
  ...restProps
}: DeleteDeckModuleProps) => {
  const handleDelete = () => {
    handleDeckDelete(id)
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
        <Typography variant={'body1'}>Do you really want to remove {deckName}?</Typography>
        <div className={s.buttonWrapper}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete}>Delete Deck</Button>
        </div>
      </ModalContent>
    </ModalRoot>
  )
}
