import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const selectOptions = [
  { title: 'Option 1', value: 'option1' },
  { title: 'Option 2', value: 'option2' },
  { title: 'Option 3', value: 'option3' },
]

export const Default: Story = {
  args: {
    label: 'Select-Box',
    options: selectOptions,
    placeholder: 'Change select...',
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Select-Box',
    options: selectOptions,
    placeholder: 'Change select...',
  },
}
