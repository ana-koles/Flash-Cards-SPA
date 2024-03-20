import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from './'

const meta = {
  argTypes: {},
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  title: 'Components/Auth/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordFormDefault: Story = {
  args: {
    onSubmit: data => console.log(data),
  },
}
