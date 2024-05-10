import type { Meta, StoryObj } from '@storybook/react'

import { defaultAvatar } from '@/assets'
import { Dropdown, MenuBurger, UserDropdown } from '@/components'

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const user = {
  avatar: defaultAvatar,
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
        <MenuBurger deckId={''} onDeleteClick={() => {}} onEditClick={() => {}} />
      </div>
    )
  },
}
