import React, { ComponentPropsWithoutRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export type TabComponent = {
  listConent: React.ReactNode
  listName: string
  value: string
}

type TabsProps = {
  defaultValue: string
  disabled: boolean
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  tabsContent: TabComponent[]
  value: 'string'
} & ComponentPropsWithoutRef<typeof Tabs.Root>

export const TabsComponent = React.forwardRef((props: TabsProps, forwardedRef) => {
  const { disabled, onValueChange, orientation, tabsContent, value, ...restProps } = props

  return (
    <Tabs.Root defaultValue={tabsContent[0].value} orientation={orientation}>
      <Tabs.List className={s.tabsList}>
        {tabsContent.map(item => (
          // eslint-disable-next-line react/jsx-key
          <Tabs.Trigger className={s.tabsTrigger} disabled={disabled} value={item.value}>
            {item.listName}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabsContent.map(item => (
        // eslint-disable-next-line react/jsx-key
        <Tabs.Content value={item.value}>{item.listConent}</Tabs.Content>
      ))}
    </Tabs.Root>
  )
})

const TabsDemo = () => (
  <Tabs.Root className={'TabsRoot'} defaultValue={'tab1'}>
    <Tabs.List aria-label={'Manage your account'} className={'TabsList'}>
      <Tabs.Trigger className={'TabsTrigger'} value={'tab1'}>
        Account
      </Tabs.Trigger>
      <Tabs.Trigger className={'TabsTrigger'} value={'tab2'}>
        Password
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content className={'TabsContent'} value={'tab1'}>
      <p className={'Text'}>Make changes to your account here. Click save when re done.</p>
      <fieldset className={'Fieldset'}>
        <label className={'Label'} htmlFor={'name'}>
          Name
        </label>
        <input className={'Input'} defaultValue={'Pedro Duarte'} id={'name'} />
      </fieldset>
      <fieldset className={'Fieldset'}>
        <label className={'Label'} htmlFor={'username'}>
          Username
        </label>
        <input className={'Input'} defaultValue={'@peduarte'} id={'username'} />
      </fieldset>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <button className={'Button green'}>Save changes</button>
      </div>
    </Tabs.Content>
    <Tabs.Content className={'TabsContent'} value={'tab2'}>
      <p className={'Text'}>Change your password here. After saving, ll be logged out.</p>
      <fieldset className={'Fieldset'}>
        <label className={'Label'} htmlFor={'currentPassword'}>
          Current password
        </label>
        <input className={'Input'} id={'currentPassword'} type={'password'} />
      </fieldset>
      <fieldset className={'Fieldset'}>
        <label className={'Label'} htmlFor={'newPassword'}>
          New password
        </label>
        <input className={'Input'} id={'newPassword'} type={'password'} />
      </fieldset>
      <fieldset className={'Fieldset'}>
        <label className={'Label'} htmlFor={'confirmPassword'}>
          Confirm password
        </label>
        <input className={'Input'} id={'confirmPassword'} type={'password'} />
      </fieldset>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <button className={'Button green'}>Change password</button>
      </div>
    </Tabs.Content>
  </Tabs.Root>
)
