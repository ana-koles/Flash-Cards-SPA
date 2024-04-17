import type { Meta, StoryObj } from '@storybook/react'

import { EditCardModal } from './edit-card-modal'

const meta = {
  argTypes: {},
  component: EditCardModal,
  tags: ['autodocs'],
  title: 'Decks/ EditCardModal',
} satisfies Meta<typeof EditCardModal>

export default meta
type Story = StoryObj<typeof meta>

export const EditCardModalWindow: Story = {
  args: {},
}
