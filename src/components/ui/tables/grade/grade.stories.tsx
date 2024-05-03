import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Grade } from './'

const meta = {
  argTypes: {},
  component: Grade,
  tags: ['autodocs'],
  title: 'Components/Grade',
} satisfies Meta<typeof Grade>

export default meta
type Story = StoryObj<typeof meta>

export const GradeDefault: Story = {
  args: {
    maxGrade: 5,
    value: 0,
  },
  render: args => {
    const [grade, setGrade] = useState(0)

    return <Grade {...args} onClick={setGrade} value={grade} />
  },
}
