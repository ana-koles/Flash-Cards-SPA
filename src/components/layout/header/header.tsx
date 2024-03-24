import React from 'react'

import logo from '@/assets/logo/logo.png'
import { Button } from '@/components/ui/button'
import { DropdownMenuUser } from '@/components/ui/dropdownMenu/dropdownMenuUser/DropdownMenuUser'
import { Typography } from '@/components/ui/typography'

import s from './header.module.scss'

type HeaderProps = {
  isLogedIn: boolean
  userData?: {
    email: string
    name: string
  }
}

export const Header = ({ isLogedIn, userData }: HeaderProps) => {
  const classNames = {
    userName: s.userName,
  }

  return (
    <div className={s.headerWrapper}>
      <div className={s.headerContent}>
        <img alt={'logo'} className={s.logo} src={logo} />
        {isLogedIn ? (
          <Button variant={'secondary'}>Sign in</Button>
        ) : (
          <div className={s.menuWrapper}>
            <Typography as={'span'} className={classNames.userName} variant={'subtitle1'}>
              {userData?.name}
            </Typography>
            <DropdownMenuUser />
          </div>
        )}
      </div>
    </div>
  )
}
