import type { Meta, StoryObj } from '@storybook/react'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import { AddDeckModal } from './add-deck-modal'

const meta = {
  argTypes: {},
  component: AddDeckModal,
  tags: ['autodocs'],
  title: 'Decks/ Add Deck Modal',
} satisfies Meta<typeof AddDeckModal>

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
    children: <></>,
    onOpenChange: () => {},
    open: true,
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = () => {
      setIsOpen(true)
    }

    return (
      <>
        <Button onClick={handleOpenChange}>Click to open Modal Window</Button>
        <AddDeckModal handleDataConfirm={() => {}} onOpenChange={setIsOpen} open={isOpen}>
          <ChildrenComponent />
        </AddDeckModal>
      </>
    )
  },
}
