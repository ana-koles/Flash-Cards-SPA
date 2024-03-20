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
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Option 4', value: 'option4' },
      { label: 'Option 5', value: 'option5' },
    ],
  },
}
