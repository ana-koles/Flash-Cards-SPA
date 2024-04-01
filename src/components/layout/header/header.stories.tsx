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

const user = {
  avatar: 'https://seeklogo.com/images/S/spider-man-comic-new-logo-322E9DE914-seeklogo.com.png',
  email: 'best.email@gmail.com',
  name: 'SpiderMan',
}

export const HeaderWithAvatar: Story = {
  args: {
    isLogedIn: true,
    userData: user,
  },
}

export const HeaderWithButton: Story = {
  args: {
    isLogedIn: false,
    userData: user,
  },
}
