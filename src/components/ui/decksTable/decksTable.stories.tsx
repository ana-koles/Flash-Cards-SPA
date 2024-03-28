import type { Meta, StoryObj } from '@storybook/react'

import { DecksTable } from '@/components/ui/decksTable/decksTable'

const meta = {
  argTypes: {},
  component: DecksTable,
  tags: ['autodocs'],
  title: 'Components/ DecksTable',
} satisfies Meta<typeof DecksTable>

export default meta
type Story = StoryObj<typeof meta>

const mockDecks = [
  {
    cards: 50,
    createdBy: 'Antony',
    id: 'fddb84b-f674-4507-a0c8-a8a9ef68c9b6',
    lastUpdated: '2023-09-04T22:35:07',
    name: 'Court',
  },
  {
    cards: 35,
    createdBy: 'Mark',
    id: '2d8324af-3516-47d5-8f42-8ad7a68fd9c2',
    lastUpdated: '2023-08-19T22:45:58',
    name: 'Personal',
  },
  {
    cards: 43,
    createdBy: 'Teresa',
    id: '0110bf6d-305a-453a-90fa-3af94cd910ce',
    lastUpdated: '2023-09-24T01:49:08',
    name: 'Begin',
  },
]

export const Default: Story = {
  args: {
    decks: mockDecks,
  },
}
