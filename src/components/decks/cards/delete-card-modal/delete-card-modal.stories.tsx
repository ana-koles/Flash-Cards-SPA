import type { Meta, StoryObj } from '@storybook/react'

import { DeleteCardModal } from './'

const meta = {
  argTypes: {},
  component: DeleteCardModal,
  tags: ['autodocs'],
  title: 'Decks/ DeleteCardModal',
} satisfies Meta<typeof DeleteCardModal>

export default meta
type Story = StoryObj<typeof meta>

const card = { id: '1', name: 'My Card' }

export const DeleteCardModalWindow: Story = {
  args: {
    card: card,
    onDeleteCard: () => {},
  },
}
