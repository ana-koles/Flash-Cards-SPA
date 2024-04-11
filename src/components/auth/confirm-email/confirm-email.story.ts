import type { Meta, StoryObj } from '@storybook/react'

import { ConfirmEmailModal } from './'

const meta = {
  argTypes: {},
  component: ConfirmEmailModal,
  tags: ['autodocs'],
  title: 'Components/Auth/CheckEmailForm',
} satisfies Meta<typeof ConfirmEmailModal>

export default meta
type Story = StoryObj<typeof meta>

export const ConfirmEmailDefault: Story = {
  args: {
    email: 'example@mail.com',
  },
}
