import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography'

import { Card } from './'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyCard: Story = {
  args: {
    style: {
      height: '300px',
      padding: '36px',
      width: '300px',
    },
  },
}

export const CardWithTypography: Story = {
  args: {
    children: <Typography variant={'h1'}>Card content</Typography>,
    style: {
      height: '300px',
      padding: '36px',
      width: '300px',
    },
  },
}
