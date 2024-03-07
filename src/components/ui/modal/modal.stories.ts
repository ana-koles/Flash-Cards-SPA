import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './index'

const meta = {
  argTypes: {
    modalTitle: {
      options: ['string'],
    },
    primaryBtnName: {
      options: ['string'],
    },
    secondarBtnName: {
      options: ['string'],
    },
    triggerBtnName: {
      options: ['string'],
    },
  },
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/ Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalStandard: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, ad minim veniamdsa',
    modalTitle: 'Title',
    open: true,
    primaryBtnName: 'Save Deck',
    secondarBtnName: 'Close',
    triggerBtnName: 'Open',
  },
}
