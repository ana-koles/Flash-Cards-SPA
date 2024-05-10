import { useState } from 'react'

import { Button, CardForm, ModalContent, ModalRoot, ModalTrigger, cardScheme } from '@/components'
import { z } from 'zod'

type DataConfirm = z.infer<typeof cardScheme>

type AddCardModalProps = {
  handleDataConfirm: (data: DataConfirm) => void
}

export const AddCardModal = ({ handleDataConfirm, ...rest }: AddCardModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalRoot {...rest} onOpenChange={setIsOpen} open={isOpen}>
      <ModalTrigger asChild>
        <Button>Add New Card</Button>
      </ModalTrigger>
      <ModalContent modalTitle={'Add New Card'}>
        <CardForm
          handleDataConfirm={handleDataConfirm}
          handleOpenChange={setIsOpen}
          variant={'add'}
        />
      </ModalContent>
    </ModalRoot>
  )
}
