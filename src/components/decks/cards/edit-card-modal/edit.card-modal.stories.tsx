import type { Meta, StoryObj } from '@storybook/react'

import { EditCardModal } from './'

const meta = {
  argTypes: {},
  component: EditCardModal,
  tags: ['autodocs'],
  title: 'Decks/ EditCardModal',
} satisfies Meta<typeof EditCardModal>

export default meta
type Story = StoryObj<typeof meta>

export const EditCardModalWindow: Story = {
  args: {
    card: {
      answer: 'answer',
      answerImg: '',
      answerVideo: '',
      created: '2024-04-19T16:32:11.678Z',
      deckId: '1',
      grade: 0,
      id: '123',
      question: 'question,',
      questionImg: '',
      questionVideo: '',
      shots: 0,
      updated: '2024-04-19T16:32:11.678Z',
      userId: '345',
    },
  },
}
