import type { Meta, StoryObj } from '@storybook/react'

import React, { useState } from 'react'

import { Button } from '../button'
import { ModalContent, ModalRoot, ModalTrigger } from './index'

const meta = {
  argTypes: {},
  component: ModalRoot,
  tags: ['autodocs'],
  title: 'Components/ Modal',
} satisfies Meta<typeof ModalRoot>

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

export const ModalWindow: Story = {
  args: {
    children: <></>,
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div>
        <ModalRoot onOpenChange={setIsOpen} open={isOpen}>
          <ModalTrigger>
            <button onClick={() => setIsOpen(true)}>Open</button>
          </ModalTrigger>
          <ModalContent modalTitle={'Modal Window'}>
            <div>
              <ChildrenComponent />
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </ModalContent>
        </ModalRoot>
      </div>
    )
  },
}
