import type { Meta, StoryObj } from '@storybook/react'

import { TabsComponent } from './tabs'

const meta = {
  argTypes: {},
  component: TabsComponent,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof TabsComponent>

export default meta
type Story = StoryObj<typeof meta>

export const TabsPrimary: Story = {
  args: {
    defaultValue: 'allCards',
    disabled: false,
    orientation: 'horizontal',
    tabLinkNames: [
      { linkName: 'My cards', value: 'myCards' },
      { linkName: 'All cards', value: 'allCards' },
    ],
  },
}

export const TabsPrimaryVertical: Story = {
  args: {
    defaultValue: 'myCards',
    disabled: false,
    orientation: 'vertical',
    tabLinkNames: [
      { linkName: 'My cards', value: 'myCards' },
      { linkName: 'All cards', value: 'allCards' },
    ],
  },
}

export const TabsDisabeled: Story = {
  args: {
    defaultValue: 'myCards',
    disabled: true,
    orientation: 'horizontal',
    tabLinkNames: [
      { linkName: 'My cards', value: 'myCards' },
      { linkName: 'All cards', value: 'allCards' },
    ],
  },
}
