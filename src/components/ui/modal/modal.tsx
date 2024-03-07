import React, { ComponentPropsWithRef, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { Button } from '../button'
import closeIcon from './close.svg'

type ModalProps = {
  modalTitle: string
  primaryBtnName: string
  secondarBtnName: string
  triggerBtnName: string
} & ComponentPropsWithRef<typeof Dialog.Root>

export const Modal = ({
  children,
  modalTitle,
  open = false,
  primaryBtnName,
  secondarBtnName,
  triggerBtnName,
  ...restProps
}: ModalProps) => {
  const [openStatus, setOpenStatus] = useState(open)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button name={triggerBtnName}>{triggerBtnName}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          <Dialog.Title>{modalTitle}</Dialog.Title>
          <Dialog.Description />
          {children}
          <Dialog.Close asChild>
            <Button name={secondarBtnName} variant={'secondary'}>
              {secondarBtnName}
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button name={primaryBtnName}>{primaryBtnName}</Button>
          </Dialog.Close>

          <Dialog.Close>
            <Button>
              <img alt={'close'} src={closeIcon} />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="Button violet">Edit profile</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input className="Input" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);


