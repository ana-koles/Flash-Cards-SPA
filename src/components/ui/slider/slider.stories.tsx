import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'
import { useState } from 'react'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => {
    const min = 0
    const max = 100
    const [value, setValues] = useState({ min: 0, max: 100 })
    const onChangeHandler = (values: number[]) => {
      setValues({ min: values[0], max: values[1] })
    }

    return (
      <Slider min={min} max={max} onValueChange={onChangeHandler} value={[value.min, value.max]} />
    )
  },
}
