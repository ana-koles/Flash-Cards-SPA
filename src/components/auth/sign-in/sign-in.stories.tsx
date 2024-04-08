import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/components/auth/sign-in/sign-in'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
