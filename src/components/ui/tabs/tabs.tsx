import React, { ComponentPropsWithoutRef, ElementRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

type TabRootProps = {
  children: React.ReactNode
  defaultValue: string
} & ComponentPropsWithoutRef<typeof Tabs.Root>

export const TabRoot = React.forwardRef<ElementRef<typeof Tabs.Root>, TabRootProps>(
  ({ children, defaultValue, ...restProps }: TabRootProps, ref) => {
    return (
      <Tabs.Root defaultValue={defaultValue} {...restProps} ref={ref}>
        {children}
      </Tabs.Root>
    )
  }
)

type TabListProps = {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
} & ComponentPropsWithoutRef<typeof Tabs.List>

export const TabList = React.forwardRef<ElementRef<typeof Tabs.List>, TabListProps>(
  (props: TabListProps, ref) => {
    const { children, className, orientation = 'horizontal', ...restProps } = props

    return (
      <Tabs.List className={s.tabsList} data-orientation={orientation} {...restProps} ref={ref}>
        {children}
      </Tabs.List>
    )
  }
)

type TabTriggerProps = {
  children: React.ReactNode
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<typeof Tabs.Trigger>

export const TabTrigger = React.forwardRef<ElementRef<typeof Tabs.Trigger>, TabTriggerProps>(
  ({ children, className, onValueChange, value, ...restProps }: TabTriggerProps, ref) => {
    return (
      <Tabs.Trigger className={`${s.tabsTrigger}`} value={value} {...restProps} ref={ref}>
        {children}
      </Tabs.Trigger>
    )
  }
)

type TabContentProps = {
  children: React.ReactNode
} & ComponentPropsWithoutRef<typeof Tabs.Content>

export const TabContent = React.forwardRef<ElementRef<typeof Tabs.Content>, TabContentProps>(
  ({ children, ...restProps }: TabContentProps, ref) => {
    return (
      <Tabs.Content {...restProps} ref={ref}>
        {children}
      </Tabs.Content>
    )
  }
)
