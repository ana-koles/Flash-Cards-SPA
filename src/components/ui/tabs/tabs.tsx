import React, { ComponentPropsWithoutRef, MouseEventHandler, useState } from 'react'

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
  value: string | undefined
} & ComponentPropsWithoutRef<typeof Tabs.Root>

export const TabsComponent = React.forwardRef((props: TabsProps, forwardedRef) => {
  const { defaultValue, disabled, onValueChange, orientation, tabLinkNames, value, ...restProps } =
    props

  const [activeTab, setActiveTab] = useState(value || tabLinkNames[0].value)

  const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = e => {
    const clickedValue = e.currentTarget.value

    setActiveTab(clickedValue)

    if (onValueChange) {
      onValueChange(clickedValue)
    }
  }

  return (
    <Tabs.Root orientation={orientation} value={activeTab}>
      <Tabs.List className={s.tabsList}>
        {tabLinkNames.map(item => (
          // eslint-disable-next-line react/jsx-key
          <Tabs.Trigger
            className={`${s.tabsTrigger} ${item.value === activeTab ? s.active : ''}`}
            disabled={disabled}
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
