import type { Meta, StoryObj } from '@storybook/react'

import { QuestionForm } from './question-form'

const meta = {
  component: QuestionForm,
  tags: ['autodocs'],
  title: 'Decks/QuestionForm',
} satisfies Meta<typeof QuestionForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    deckName: 'This',
  },
}
