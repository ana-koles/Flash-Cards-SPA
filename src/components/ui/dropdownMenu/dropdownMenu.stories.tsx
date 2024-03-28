import type { Meta, StoryObj } from '@storybook/react'

import { BurgerMenu } from '@/assets/icons/burgerMenu'
import avatar from '@/assets/images/avatar.png'
import { Dropdown } from '@/components/ui/dropdownMenu/dropdownMenu'
import { UserDropdown } from '@/components/ui/userDropdown/userDropdown'

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
      <UserDropdown avatar={avatar} email={'j&johnson@gmail.com'} name={'Ivan'} />
    </div>
  ),
}
export const MenuBurger: Story = {
  args: {},
  render: () => (
    <div style={{ marginLeft: '300px' }}>
      <BurgerMenu />
    </div>
  ),
}
