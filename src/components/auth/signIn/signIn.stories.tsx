import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/components/auth/signIn/signIn'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
