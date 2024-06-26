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
    avatar: user.avatar,
    email: user.email,
    isAuth: true,
    logout: () => console.log('logout'),
    name: user.name,
  },
}

export const HeaderWithButton: Story = {
  args: {
    isAuth: false,
    logout: () => console.log('logout'),
  },
}
