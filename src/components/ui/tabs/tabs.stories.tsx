import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TabContent, TabList, TabRoot, TabTrigger } from './'

const meta = {
  argTypes: {},
  component: TabRoot,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof TabRoot>

export default meta
type Story = StoryObj<typeof meta>

const tabLinkNames = [
  { linkName: 'My cards', value: 'myCards' },
  { linkName: 'All cards', value: 'allCards' },
]

export const Tabs: Story = {
  args: {
    children: <></>,
    defaultValue: 'myCards',
  },

  render: () => {
    const [valueToShow, setValueToShow] = useState('myCards')

    return (
      <TabRoot defaultValue={'myCards'} onValueChange={setValueToShow}>
        <TabList orientation={'horizontal'}>
          {tabLinkNames.map(item => (
            <TabTrigger key={item.value} value={item.value}>
              {item.linkName}
            </TabTrigger>
          ))}
        </TabList>
        <TabContent value={valueToShow}>
          <h1>{valueToShow}</h1>
        </TabContent>
      </TabRoot>
    )
  },
}

export const TabsVertical: Story = {
  args: {
    children: <></>,
    defaultValue: 'myCards',
  },

  render: () => {
    const [valueToShow, setValueToShow] = useState('myCards')

    return (
      <TabRoot defaultValue={'myCards'} onValueChange={setValueToShow}>
        <TabList orientation={'vertical'}>
          {tabLinkNames.map(item => (
            <TabTrigger key={item.value} value={item.value}>
              {item.linkName}
            </TabTrigger>
          ))}
        </TabList>
        <TabContent value={valueToShow}>
          <h1>{valueToShow}</h1>
        </TabContent>
      </TabRoot>
    )
  },
}

export const TabsDisable: Story = {
  args: {
    children: <></>,
    defaultValue: 'myCards',
  },

  render: () => {
    const [valueToShow, setValueToShow] = useState('myCards')

    return (
      <TabRoot defaultValue={'myCards'} onValueChange={setValueToShow}>
        <TabList orientation={'horizontal'}>
          {tabLinkNames.map(item => (
            <TabTrigger disabled key={item.value} value={item.value}>
              {item.linkName}
            </TabTrigger>
          ))}
        </TabList>
        <TabContent value={valueToShow}>
          <h1>{valueToShow}</h1>
        </TabContent>
      </TabRoot>
    )
  },
}
