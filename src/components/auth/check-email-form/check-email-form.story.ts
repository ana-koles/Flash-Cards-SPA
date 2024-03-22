import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmailForm } from './'

const meta = {
  argTypes: {},
  component: CheckEmailForm,
  tags: ['autodocs'],
  title: 'Components/Auth/CheckEmailForm',
} satisfies Meta<typeof CheckEmailForm>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailFormDefault: Story = {
  args: {
    email: 'example@mail.com',
  },
}
