import React, { ComponentPropsWithRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { Button } from '../button'
import closeIcon from './close.svg'

export const ModalRoot = Dialog.Root

type ModalContentProps = {
  children: ReactNode
  modalTitle: string
} & ComponentPropsWithRef<typeof Dialog.Content>

export const ModalContent = forwardRef<ElementRef<typeof Dialog.Content>, ModalContentProps>(
  ({ children, className, modalTitle, ...restProps }: ModalContentProps, ref) => {
    return (
      <>
        <Dialog.Overlay className={s.modalOverlay} />
        <Dialog.Content className={s.modalContent} {...restProps} ref={ref}>
          <div className={s.headerWrapper}>
            <Dialog.Title className={s.modalTitle}>{modalTitle}</Dialog.Title>
            <Dialog.Close aria-label={'Close'} asChild>
              <Button>
                <img alt={'close'} src={closeIcon} />
              </Button>
            </Dialog.Close>
          </div>
          <div className={s.contentWrapper}>{children}</div>
        </Dialog.Content>
      </>
    )
  }
)

type ModalTriggerProps = {
  children: React.ReactNode
} & ComponentPropsWithRef<typeof Dialog.DialogTrigger>

export const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <Dialog.DialogTrigger ref={ref} {...restProps}>
        {children}
      </Dialog.DialogTrigger>
    )
  }
)


/* const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>,ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
        ({ className, ...props }, ref) => (
         <TabsPrimitive.List className={clsx(s.list, className)} ref={ref} {...props} />
)) */


/* const TabsList = forwardRef(
  ({ className, ...props }, ref) => (
         <TabsPrimitive.List className={clsx(s.list, className)} ref={ref} {...props} />
)
) */