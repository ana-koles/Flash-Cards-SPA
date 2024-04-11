import type { Meta, StoryObj } from '@storybook/react'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import { EditCardModal } from './edit-card-modal'

const meta = {
  argTypes: {},
  component: EditCardModal,
  tags: ['autodocs'],
  title: 'Decks/ EditCardModal',
} satisfies Meta<typeof EditCardModal>

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

export const EditCardModalWindow: Story = {
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
        <EditCardModal handleDataConfirm={() => {}} onOpenChange={setIsOpen} open={isOpen}>
          <ChildrenComponent />
        </EditCardModal>
      </>
    )
  },
}
