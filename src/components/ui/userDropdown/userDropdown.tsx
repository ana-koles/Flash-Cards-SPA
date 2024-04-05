import { useNavigate } from 'react-router-dom'

import { PersonIcon } from '@/assets/icons/personIcon'
import { SignOut } from '@/assets/icons/signOut'
import defaultAvatar from '@/assets/images/defaultAvatar.jpg'
import { Avatar } from '@/components/ui/avatar/avatar'
import {
  Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu/dropdownMenu'
import { Typography } from '@/components/ui/typography'
import { UpdateUserDataArgs } from '@/services/auth/auth.types'

import s from './userDropdown.module.scss'

export type UserData = {
  avatar?: string | undefined
  email?: string
  name?: string
}

export type DropdownMenuUserProps = {
  logout: () => void
  updateUserData: (newUserData: UpdateUserDataArgs) => void
  userData?: UserData
}

export const UserDropdown = ({ logout, updateUserData, userData }: DropdownMenuUserProps) => {
  const { avatar, email, name } = userData ?? {}
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/profile')
  }

  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <button className={s.trigger}>
          {name}
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
