import React, { ComponentPropsWithoutRef, MouseEventHandler, useState } from 'react'

// eslint-disable-next-line import/no-unresolved
import * as Tabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

type tabLinkNames = {
  linkName: string
  value: string
}

type TabsProps = {
  disabled: boolean
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  tabLinkNames: tabLinkNames[]
  value?: string
} & ComponentPropsWithoutRef<typeof Tabs.Root>

export const TabsComponent = React.forwardRef((props: TabsProps, ref) => {
  const {
    defaultValue,
    disabled,
    onValueChange,
    orientation = 'horizontal',
    tabLinkNames,
    value,
    ...restProps
  } = props


  const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = e => {
    const clickedValue = e.currentTarget.value

    if (onValueChange) {
      onValueChange(clickedValue)
    }
  }

  return (
    <Tabs.Root defaultValue={defaultValue} {...restProps}>
      <Tabs.List className={s.tabsList} data-orientation={orientation}>
        {tabLinkNames.map(item => (
          <Tabs.Trigger
            className={`${s.tabsTrigger}`}
            disabled={disabled}
            key={item.value}
            onClick={handleTriggerClick}
            value={item.value}
          >
            {item.linkName}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
})

/*
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
 */