import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ModalContent, ModalRoot } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

type DeleteCardModuleProps = {
  cardId: string
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const DeleteCardModule = ({
  cardId,
  onOpenChange,
  open,
  ...restProps
}: DeleteCardModuleProps) => {
  const handleCardDelete = (e: React.MouseEvent<HTMLButtonElement>) => {}

  return (
    <ModalRoot {...restProps} onOpenChange={onOpenChange} open={open}>
      <ModalContent modalTitle={'Delete Card'}>
        <Typography variant={'body1'}>
          Do you really want to remove Card Name? All cards will be deleted.
        </Typography>
        <div>
          <Button>Cancel</Button>
          <Button>Delete Card</Button>
        </div>
      </ModalContent>
    </ModalRoot>
  )
}
