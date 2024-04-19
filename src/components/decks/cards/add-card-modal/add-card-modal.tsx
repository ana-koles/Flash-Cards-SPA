import { useState } from 'react'

import { Button, ModalContent, ModalRoot, ModalTrigger } from '@/components'
import { z } from 'zod'

import { CardForm } from '../card-form'
import { cardAddScheme } from '../card-validation'

type DataConfirm = z.infer<typeof cardAddScheme>

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