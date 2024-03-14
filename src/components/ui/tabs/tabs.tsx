import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export const TabRoot = forwardRef<
  ElementRef<typeof Tabs.Root>,
  ComponentPropsWithoutRef<typeof Tabs.Root>
>(({ children, defaultValue, ...restProps }, ref) => {
  return (
    <Tabs.Root defaultValue={defaultValue} {...restProps} ref={ref}>
      {children}
    </Tabs.Root>
  )
})

TabRoot.displayName = 'TabRoot'

type TabListProps = {
  children: ReactNode
  orientation?: 'horizontal' | 'vertical'
} & ComponentPropsWithoutRef<typeof Tabs.List>

export const TabList = forwardRef<ElementRef<typeof Tabs.List>, TabListProps>(
  (props: TabListProps, ref) => {
    const { children, className, orientation = 'horizontal', ...restProps } = props

    return (
      <Tabs.List className={s.tabsList} data-orientation={orientation} {...restProps} ref={ref}>
        {children}
      </Tabs.List>
    )
  }
)

TabList.displayName = 'TabList'

export const TabTrigger = forwardRef<
  ElementRef<typeof Tabs.Trigger>,
  ComponentPropsWithoutRef<typeof Tabs.Trigger>
>(({ children, className, value, ...restProps }, ref) => {
  return (
    <Tabs.Trigger className={`${s.tabsTrigger}`} value={value} {...restProps} ref={ref}>
      {children}
    </Tabs.Trigger>
  )
})

TabTrigger.displayName = 'TabTrigger'

export const TabContent = forwardRef<
  ElementRef<typeof Tabs.Content>,
  ComponentPropsWithoutRef<typeof Tabs.Content>
>(({ children, ...restProps }, ref) => {
  return (
    <Tabs.Content {...restProps} ref={ref}>
      {children}
    </Tabs.Content>
  )
})

TabContent.displayName = 'TabContent'
