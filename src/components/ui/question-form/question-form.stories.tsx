import type { Meta, StoryObj } from '@storybook/react'

import { QuestionForm } from './'

const meta = {
  component: QuestionForm,
  tags: ['autodocs'],
  title: 'Decks/QuestionForm',
} satisfies Meta<typeof QuestionForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    card: {
      answer: '',
      answerImg: '',
      answerVideo: '',
      created: '',
      deckId: '',
      grade: 0,
      id: '',
      question: '',
      questionImg: '',
      questionVideo: '',
      shots: 0,
      updated: '',
      userId: '',
    },
    deckName: 'This',
    onSaveGrade: () => {},
  },
}
