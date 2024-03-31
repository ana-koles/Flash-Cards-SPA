import { PersonIcon } from '@/assets/icons/personIcon'
import { SignOut } from '@/assets/icons/signOut'
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

import s from './userDropdown.module.scss'

export type DropdownMenuUserProps = {
  avatar?: string | undefined
  email?: string
  name?: string
}

export const UserDropdown = ({ avatar, email, name }: DropdownMenuUserProps) => {
  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <button className={s.trigger}>
          {name}
          <Avatar className={s.avaTrigger} src={avatar} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'} className={s.container}>
        <DropdownMenuLabel className={s.label}>
          <Avatar src={avatar} />
          <div className={s.contacts}>
            <Typography as={'span'} className={s.name} variant={'subtitle2'}>
              {name}
            </Typography>
            <span className={s.email}>{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className={s.itemsBox}>
          <DropdownMenuItem className={s.item}>
            <PersonIcon />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={s.item}>
            <SignOut />
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </Dropdown>
  )
}
