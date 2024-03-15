import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta = {
  argTypes: {
    label: {
      options: ['string'],
    },
    name: {
      options: ['string'],
    },
    placeholder: {
      options: ['string'],
    },
    type: {
      options: ['password', 'text'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const InputField: Story = {
  args: {
    label: 'Input',
    name: 'input_field',
    placeholder: 'Input',
    type: 'text',
  },
}

export const PasswordField: Story = {
  args: {
    label: 'Input',
    name: 'password_field',
    placeholder: 'Input',

    type: 'password',

  },
}

export const SearchField: Story = {
  args: {
    name: 'search_field',
    placeholder: 'Input search',
    search: true,
    type: 'text',
  },
}

export const DisabeledSearchInput: Story = {
  args: {
    disabled: true,
    name: 'search_field',
    placeholder: 'Input search',
    search: true,
    type: 'text',
  },
}

export const DisabeledPasswordInput: Story = {
  args: {
    disabled: true,
    label: 'Input',
    name: 'password_field',
    placeholder: 'Input',
    type: 'password',
  },
}

export const DisabeledInputFieldt: Story = {
  args: {
    disabled: true,
    label: 'Input',
    name: 'input_field',
    placeholder: 'Input',
    type: 'text',
  },
}
