import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from './'

const meta = {
  argTypes: {},
  component: CreateNewPasswordForm,
  tags: ['autodocs'],
  title: 'AUTH/CreateNewPasswordForm',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordFormDefault: Story = {
  args: {
    onSubmit: data => console.log(data),
  },
}
