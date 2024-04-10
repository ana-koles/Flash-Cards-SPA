import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { DeleteDeckModule } from './delete-deck-modal'

const meta = {
  argTypes: {},
  component: DeleteDeckModule,
  tags: ['autodocs'],
  title: 'Decks/ Delete Deck Modal',
} satisfies Meta<typeof DeleteDeckModule>

export default meta
type Story = StoryObj<typeof meta>

const deck = { id: '1', name: 'My Deck' }

export const DeleteCardModalWindow: Story = {
  args: {
    children: <></>,
    deckName: deck.name,
    handleDeckDelete: () => {},
    id: deck.id,
    onOpenChange: () => {},
    open: true,
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = () => {
      setIsOpen(true)
    }

    const handleDeckDelete = () => {
      setIsOpen(true)
    }

    return (
      <>
        <Button onClick={handleOpenChange}>Click to open Modal Window</Button>
        <DeleteDeckModule
          {...args}
          handleDeckDelete={handleDeckDelete}
          onOpenChange={setIsOpen}
          open={isOpen}
        ></DeleteDeckModule>
      </>
    )
  },
}
