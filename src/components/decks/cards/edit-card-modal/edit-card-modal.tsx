import { useState } from 'react'

import { EditIcon } from '@/assets'
import { Button, ModalContent, ModalRoot, ModalTrigger } from '@/components'
import { CardResponse } from '@/services'
import { z } from 'zod'

import { CardForm } from '../card-form/card-form'
import { cardScheme } from '../card-validation'

type EditCardModalProps = {
  card: CardResponse
  handleDataConfirm: (data: DataConfirm) => void
}

type DataConfirm = z.infer<typeof cardScheme>

export const EditCardModal = ({ card, handleDataConfirm, ...rest }: EditCardModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalRoot {...rest} onOpenChange={setIsOpen} open={isOpen}>
      <ModalTrigger asChild>
        <Button variant={'icon'}>
          <EditIcon />
        </Button>
      </ModalTrigger>
      <ModalContent modalTitle={'Edit Card'}>
        <CardForm
          card={card}
          handleDataConfirm={handleDataConfirm}
          handleOpenChange={setIsOpen}
          variant={'edit'}
        />
      </ModalContent>
    </ModalRoot>
  )
}
