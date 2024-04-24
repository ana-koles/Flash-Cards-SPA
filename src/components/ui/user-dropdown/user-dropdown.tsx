import { Link } from 'react-router-dom'

import { PersonIcon } from '@/assets/icons/person-icon'
import { SignOut } from '@/assets/icons/sign-out'
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
  return (
    <Dropdown modal={false}>
      <DropdownMenuTrigger asChild>
        <button className={s.trigger}>
          <Typography as={'a'} className={s.avaName} variant={'subtitle2'}>
            {name}
          </Typography>
          <Avatar avatar={avatar} className={s.avaTrigger} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={s.container}>
        <DropdownMenuLabel className={s.label}>
          <Avatar avatar={avatar} />

          <div className={s.contacts}>
            <Typography as={'span'} className={s.name} variant={'subtitle2'}>
              {name}
            </Typography>
            <span className={s.email}>{email}</span>
          </div>
        </DropdownMenuLabel>
        <div className={s.itemsBox}>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={s.item}>
            <Link to={'/profile'}>
              <PersonIcon />
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={s.item}>
            <Link onClick={logout} to={'/login'}>
              <SignOut />
              Sign Out
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </Dropdown>
  )
}
