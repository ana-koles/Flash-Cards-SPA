import type { Meta, StoryObj } from '@storybook/react'

import { AddCardModal } from './'

const meta = {
  argTypes: {},
  component: AddCardModal,
  tags: ['autodocs'],
  title: 'Decks/ AddCardModal',
} satisfies Meta<typeof AddCardModal>

export default meta
type Story = StoryObj<typeof meta>

export const AddCardModalWindow: Story = {
  args: {
    handleDataConfirm: () => {},
  },
}
