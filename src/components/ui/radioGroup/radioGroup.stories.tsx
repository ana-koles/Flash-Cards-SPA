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
  { value: 'option1', label: 'Option 1', disabled: false },
  { value: 'option2', label: 'Option 2', disabled: false },
  { value: 'option3', label: 'Option 3', disabled: false },
  { value: 'option4', label: 'Option 4', disabled: false },
  { value: 'option5', label: 'Option 5', disabled: false },
]

export const Default: Story = {
  args: {
    defaultValue: radioOptions[0].value,
    options: radioOptions,
  },
}

export const Disabled: Story = {
  args: {
    options: radioOptions,
    disabled: true,
  },
}
