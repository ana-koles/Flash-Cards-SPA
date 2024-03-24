import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './header'

const meta = {
  argTypes: {},
  component: Header,
  tags: ['autodocs'],
  title: 'Layout/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithButton: Story = {
  args: {
    isLogedIn: true,
  },
}

export const HeaderWithAvatar: Story = {
  args: {
    isLogedIn: false,
    userData: {
      email: 'ivan@gmail.com',
      name: 'Ivan',
    },
  },
}
