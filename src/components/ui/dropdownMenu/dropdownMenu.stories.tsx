import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown } from '@/components/ui/dropdownMenu/dropdownMenu'
import { DropdownMenuBurger } from '@/components/ui/dropdownMenu/dropdownMenuBurger/dropdownMenuBurger'
import { DropdownMenuUser } from '@/components/ui/dropdownMenu/dropdownMenuUser/DropdownMenuUser'

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const MenuUser: Story = {
  args: {},
  render: () => (
    <div style={{ marginLeft: '300px' }}>
      <DropdownMenuUser />
    </div>
  ),
}
export const MenuBurger: Story = {
  args: {},
  render: () => (
    <div style={{ marginLeft: '300px' }}>
      <DropdownMenuBurger />
    </div>
  ),
}
