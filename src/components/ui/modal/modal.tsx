import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import closeIcon from './close.svg'

export const ModalRoot = Dialog.Root

type ModalContentProps = {
  children: ReactNode
  modalTitle: string
} & ComponentPropsWithoutRef<typeof Dialog.Content>

export const ModalContent = forwardRef<ElementRef<typeof Dialog.Content>, ModalContentProps>(
  ({ children, className, modalTitle, ...restProps }: ModalContentProps, ref) => {
    return (
      <>
        <Dialog.Overlay className={s.modalOverlay} />
        <Dialog.Content className={s.modalContent} {...restProps} ref={ref}>
          <div className={s.headerWrapper}>
            <Dialog.Title className={s.modalTitle}>{modalTitle}</Dialog.Title>
            <Dialog.Close aria-label={'Close'}>
              <img alt={'close'} src={closeIcon} />
            </Dialog.Close>
          </div>
          <div className={s.contentWrapper}>{children}</div>
        </Dialog.Content>
      </>
    )
  }
)

type ModalTriggerProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<typeof Dialog.DialogTrigger>

export const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <Dialog.DialogTrigger ref={ref} {...restProps}>
        {children}
      </Dialog.DialogTrigger>
    )
  }
)
