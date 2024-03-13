import type { Meta, StoryObj } from '@storybook/react'

import { TableWrapper } from './table'

const meta = {
  argTypes: {},
  component: TableWrapper,
  tags: ['autodocs'],
  title: 'Components/ Table',
} satisfies Meta<typeof TableWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Table: Story = {
  args: {
    children: <></>,
  },
  render: () => {
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
