import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from '@/components/auth/signUp/signUp'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Auth/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
