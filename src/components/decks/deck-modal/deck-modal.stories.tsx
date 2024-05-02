import type { Meta, StoryObj } from '@storybook/react'

import React, { useState } from 'react'

import { Button, DeckModal } from '@/components'

const meta = {
  argTypes: {},
  component: DeckModal,
  tags: ['autodocs'],
  title: 'Decks/ Add Deck Modal',
} satisfies Meta<typeof DeckModal>

export default meta
type Story = StoryObj<typeof meta>

const ChildrenComponent: React.FC = () => {
  const [text, setText] = useState('')
  const handleClick = () => {
    setText('I am a message')
  }

  return (
    <>
      <h1>I am a body of the Modal window</h1>
      <button onClick={handleClick}>Show message</button>
      <p>{text}</p>
    </>
  )
}

export const AddDeckModalWindow: Story = {
  args: {
    onOpenChange: () => {},
    open: true,
    title: 'New Deck',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = () => {
      setIsOpen(true)
    }

    return (
      <>
        <Button onClick={handleOpenChange}>Click to open Modal Window</Button>
        <DeckModal onOpenChange={setIsOpen} open={isOpen}>
          <ChildrenComponent />
        </DeckModal>
      </>
    )
  },
}
