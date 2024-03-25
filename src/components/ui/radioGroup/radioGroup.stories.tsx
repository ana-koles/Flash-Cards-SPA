import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioItem } from './'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <RadioItem label={'Option 1'} value={'option 1'} />
        <RadioItem label={'Option 2'} value={'option 2'} />
        <RadioItem label={'Option 3'} value={'option 3'} />
      </>
    ),
    defaultValue: 'option 1',
  },
}

export const Disabled: Story = {
  args: {
    children: (
      <>
        <RadioItem label={'Option 1'} value={'option 1'} />
        <RadioItem label={'Option 2'} value={'option 2'} />
        <RadioItem label={'Option 3'} value={'option 3'} />
      </>
    ),
    disabled: true,
  },
}
