import { PersonIcon } from '@/assets/icons/personIcon'
import { SignOut } from '@/assets/icons/signOut'
import {
  Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu/dropdownMenu'
import { Typography } from '@/components/ui/typography'

import s from './DropdownMenuUser.module.scss'

import avatar from '../../../../assets/images/avatar.png'

export const DropdownMenuUser = () => {
  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <button className={s.trigger}>
          {<img alt={'avatar'} className={s.avaTrigger} src={avatar} />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'} className={s.container}>
        <DropdownMenuLabel className={s.label}>
          <img alt={'avatar'} className={s.img} src={avatar} />
          <div className={s.contacts}>
            <Typography as={'span'} className={s.name} variant={'subtitle2'}>
              Ivan
            </Typography>
            <span className={s.email}>j&johnson@gmail.com</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className={s.itemsBox}>
          <DropdownMenuItem className={s.item}>
            <div>
              <PersonIcon />
            </div>
            My Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={s.item}>
            <div>
              <SignOut />
            </div>
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </Dropdown>
  )
}
