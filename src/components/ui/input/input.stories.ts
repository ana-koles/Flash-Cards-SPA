import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputField: Story = {
  args: {
    name: 'input_field',
    placeholder: 'Input',
    type: 'text',
    variant: 'inputField',
  },
}

export const PasswordField: Story = {
  args: {
    name: 'password_field',
    placeholder: 'Input',
    type: 'password',
    variant: 'inputField',
  },
}

export const SearchField: Story = {
  args: {
    name: 'search_field',
    placeholder: 'Input search',
    search: true,
    type: 'text',
    variant: 'searchField',
  },
}

export const DisabeledSearchInput: Story = {
  args: {
    disabled: true,
    name: 'search_field',
    placeholder: 'Input search',
    type: 'text',
    variant: 'searchField',
  },
}

export const DisabeledPasswordInput: Story = {
  args: {
    disabled: true,
    name: 'password_field',
    placeholder: 'Input',
    type: 'password',
    variant: 'inputField',
  },
}


export const DisabeledInputFieldt: Story = {
  args: {
    disabled: true,
    name: 'input_field',
    placeholder: 'Input',
    type: 'text',
    variant: 'inputField',
  },
}
