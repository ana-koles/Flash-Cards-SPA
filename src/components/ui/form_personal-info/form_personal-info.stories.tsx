import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInfoForm } from './form_personal-info'

const meta = {
  component: PersonalInfoForm,
  tags: ['autodocs'],
  title: 'Auth/PersonalInfoForm',
} satisfies Meta<typeof PersonalInfoForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
