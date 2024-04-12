import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from './'

const meta = {
  argTypes: {},
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  title: 'AUTH/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordFormDefault: Story = {
  args: {
    handlePasswordRecover: data => console.log(data),
  },
}
