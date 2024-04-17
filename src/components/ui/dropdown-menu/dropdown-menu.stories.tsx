import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/assets/images/avatar.png'
import { Dropdown } from '@/components/ui/dropdown-menu/dropdown-menu'
import { MenuBurger } from '@/components/ui/menu-burger/menu-burger'
import { UserDropdown } from '@/components/ui/user-dropdown/user-dropdown'

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const user = {
  avatar: avatar,
  email: 'j&johnson@gmail.com',
  name: 'Ivan',
}

export const MenuUser: Story = {
  render: () => {
    const logout = () => {
      console.log('Logout')
    }

    return (
      <div style={{ marginLeft: '300px' }}>
        <UserDropdown logout={logout} {...user} />
      </div>
    )
  },
}

export const ExampleMenuBurger: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ marginLeft: '300px' }}>
        <MenuBurger deckId={''} deckName={''} onDeleteDeck={() => {}} onEditDeck={() => {}} />
      </div>
    )
  },
}
