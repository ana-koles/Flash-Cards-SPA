import type { Meta, StoryObj } from '@storybook/react'

import { Select, SelectItem } from './'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'option 1'}>Option 1</SelectItem>
        <SelectItem value={'option 2'}>Option 2</SelectItem>
        <SelectItem value={'option 3'}>Option 3</SelectItem>
      </>
    ),
    label: 'Select-Box',
    placeholder: 'Change select...',
  },
}
export const Disabled: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'option 1'}>Option 1</SelectItem>
        <SelectItem value={'option 2'}>Option 2</SelectItem>
        <SelectItem value={'option 3'}>Option 3</SelectItem>
      </>
    ),
    disabled: true,
    label: 'Select-Box',
    placeholder: 'Change select...',
  },
}
