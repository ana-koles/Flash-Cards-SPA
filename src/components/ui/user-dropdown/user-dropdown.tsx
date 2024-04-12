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

export type UserData = {
  avatar?: string | undefined
  email?: string
  name?: string
}

export type DropdownMenuUserProps = {
  logout: () => void
  userData?: UserData
}

export const UserDropdown = ({ logout, userData }: DropdownMenuUserProps) => {
  const { avatar, email, name } = userData ?? {}
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
      <DropdownMenuContent align={'end'} className={s.container}>
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
