import type { Meta, StoryObj } from '@storybook/react'

import { TabsComponent } from './tabs'

const meta = {
  argTypes: {
    disabled: {
      options: ['boolean'],
    },
    orientation: {
      options: ['horizontal', 'vertical'],
    },
    tabLinkNames: {
      options: ['tabLinkNames[]'],
    },
    value: {
      options: ['string'],
    },
  },
  component: TabsComponent,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof TabsComponent>

export default meta
type Story = StoryObj<typeof meta>

export const TabsPrimary: Story = {
  args: {
    disabled: false,
    orientation: 'horizontal',
    tabLinkNames: [
      { linkName: 'My cards', value: 'myCards' },
      { linkName: 'All cards', value: 'allCards' },
    ],
    value: 'myCards',
  },
}

export const TabsDisabeled: Story = {
  args: {
    disabled: true,
    orientation: 'horizontal',
    tabLinkNames: [
      { linkName: 'My cards', value: 'myCards' },
      { linkName: 'All cards', value: 'allCards' },
    ],
    value: 'allCards',
  },
}
