import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'
import { Typography } from '@/components/ui/typography'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyCard: Story = {
  args: {},
}

export const CardWithTypography: Story = {
  args: {
    children: <Typography variant={'h1'}>Card content</Typography>,
  },
}
