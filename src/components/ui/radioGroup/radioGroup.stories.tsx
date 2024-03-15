import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const radioOptions = [
  { disabled: false, label: 'Option 1', value: 'option1' },
  { disabled: false, label: 'Option 2', value: 'option2' },
  { disabled: false, label: 'Option 3', value: 'option3' },
  { disabled: false, label: 'Option 4', value: 'option4' },
  { disabled: false, label: 'Option 5', value: 'option5' },
]

export const Default: Story = {
  args: {
    defaultValue: radioOptions[0].value,
    options: radioOptions,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: radioOptions,
  },
}
