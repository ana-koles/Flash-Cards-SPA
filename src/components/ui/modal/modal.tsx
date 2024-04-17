import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './modal.module.scss'

import closeIcon from './close.svg'

export const ModalRoot = Dialog.Root

export type ModalContentProps = {
  children: ReactNode
  className?: string
  modalTitle?: string
  onCloseHandler: () => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Dialog>, 'onOpenChange' | 'open'>

export const ModalContent = forwardRef<ElementRef<typeof Dialog.Content>, ModalContentProps>(
  ({ children, className, modalTitle, onCloseHandler, ...restProps }: ModalContentProps, ref) => {
    return (
      <>
        <Dialog.Portal>
          <Dialog.Overlay className={s.modalOverlay} />
          <Dialog.Content className={clsx(s.modalContent, className)} {...restProps} ref={ref}>
            <div className={s.headerWrapper}>
              <Dialog.Title className={s.modalTitle}>{modalTitle}</Dialog.Title>
              <Dialog.Close aria-label={'Close'} onClick={onCloseHandler}>
                <img alt={'close'} src={closeIcon} />
              </Dialog.Close>
            </div>
            <div className={s.contentWrapper}>{children}</div>
          </Dialog.Content>
        </Dialog.Portal>
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
