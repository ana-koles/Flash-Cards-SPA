import { useState } from 'react'

import { EditIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { ModalContent, ModalRoot, ModalTrigger } from '@/components/ui/modal'
import { z } from 'zod'

import { CardForm } from '../card-form/card-form'
import { cardEditScheme } from '../card-validation'

type EditCardModalProps = {
  handleDataConfirm: (data: DataConfirm) => void
}

type DataConfirm = z.infer<typeof cardEditScheme>

export const EditCardModal = ({ handleDataConfirm, ...rest }: EditCardModalProps) => {
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
          handleDataConfirm={handleDataConfirm}
          handleOpenChange={setIsOpen}
          variant={'edit'}
        />
      </ModalContent>
    </ModalRoot>
  )
}
