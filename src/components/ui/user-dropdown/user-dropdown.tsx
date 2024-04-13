import { useNavigate } from 'react-router-dom'

import { PersonIcon } from '@/assets/icons/person-icon'
import { SignOut } from '@/assets/icons/sign-out'
import defaultAvatar from '@/assets/images/defaultAvatar.jpg'
import { Avatar } from '@/components/ui/avatar/avatar'
import {
  Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'
import { Typography } from '@/components/ui/typography'

import s from './user-dropdown.module.scss'

export type DropdownMenuUserProps = {
  avatar?: string
  email?: string
  logout: () => void
  name?: string
}

export const UserDropdown = ({ avatar, email, logout, name }: DropdownMenuUserProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/profile')
  }

  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <button className={s.trigger}>
          <Typography as={'a'} className={s.avaName} variant={'subtitle2'}>
            {name}
          </Typography>
          <Avatar className={s.avaTrigger} src={avatar ?? defaultAvatar} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={s.container}>
        <DropdownMenuLabel className={s.label}>
          <Avatar src={avatar ?? defaultAvatar} />
          <div className={s.contacts}>
            <Typography as={'span'} className={s.name} variant={'subtitle2'}>
              {name}
            </Typography>
            <span className={s.email}>{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className={s.itemsBox}>
          <DropdownMenuItem className={s.item} onClick={handleClick}>
            <PersonIcon />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={s.item} onClick={logout}>
            <SignOut />
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </Dropdown>
  )
}
