import type { Meta, StoryObj } from '@storybook/react'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import { DeleteCardModule } from './delete-card-modal'

const meta = {
  argTypes: {},
  component: DeleteCardModule,
  tags: ['autodocs'],
  title: 'Decks/ Delete Card Modal',
} satisfies Meta<typeof DeleteCardModule>

export default meta
type Story = StoryObj<typeof meta>

const card = { id: '1', name: 'My Card' }

export const DeleteCardModalWindow: Story = {
  args: {
    card: card,
    children: <></>,
    handleCardDelete: () => {},
    onOpenChange: () => {},
    open: true,
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = () => {
      setIsOpen(true)
    }

    const handleCardDelete = () => {
      setIsOpen(true)
    }

    return (
      <>
        <Button onClick={handleOpenChange}>Click to open Modal Window</Button>
        <DeleteCardModule
          {...args}
          card={card}
          handleCardDelete={handleCardDelete}
          onOpenChange={setIsOpen}
          open={isOpen}
        ></DeleteCardModule>
      </>
    )
  },
}
