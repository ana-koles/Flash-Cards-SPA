import type { Meta, StoryObj } from '@storybook/react'

import React, { useState } from 'react'

import { Button } from '../button'
import { Modal } from './index'

const meta = {
  argTypes: {},
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/ Modal',
} satisfies Meta<typeof Modal>

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

export const ModalWithSeparateButton: Story = {
  args: {
    children: () => <></>,
    modalTitle: 'Title',
    openSource: open => <Button onClick={open}>Open Modal</Button>,
  },
  render: args => {
    return (
      <>
        <Modal {...args}>
          {close => (
            <>
              <ChildrenComponent />
              <Button onClick={close}>Cancel</Button>
            </>
          )}
        </Modal>
      </>
    )
  },
}
