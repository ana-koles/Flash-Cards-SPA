import React, { ComponentPropsWithRef, ReactNode, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { Button } from '../button'
import closeIcon from './close.svg'

type ModalProps = {
  children: (close: () => void) => ReactNode
  modalTitle: string
  openSource: (open: () => void) => ReactNode
} & Omit<ComponentPropsWithRef<typeof Dialog.Root>, 'children'>

export const Modal = ({ children, modalTitle, openSource, ...restProps }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false)



  return (
    <>
      {openSource(() => setIsOpen(true))}
      <Dialog.Root {...restProps} onOpenChange={setIsOpen} open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.modalOverlay} />
          <Dialog.Content className={s.modalContent}>
            <div className={s.headerWrapper}>
              <Dialog.Title className={s.modalTitle}>{modalTitle}</Dialog.Title>
              <Dialog.Close>
                <Button>
                  <img alt={'close'} src={closeIcon} />
                </Button>
            </Dialog.Close>
            </div>
            <div className={s.contentWrapper}>{children(() => setIsOpen(false))}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
