import { Link } from 'react-router-dom'

import logo from '@/assets/logo/logo.png'
import { Button } from '@/components/ui/button'
import { UserData, UserDropdown } from '@/components/ui/userDropdown'

import s from './header.module.scss'

export type HeaderProps = {
  isAuth: boolean
  logout: () => void
  userData?: UserData
}

export const Header = ({ isAuth, ...restProps }: HeaderProps) => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.headerContent}>
        <img alt={'logo'} className={s.logo} src={logo} />
        {isAuth ? (
          <div className={s.menuWrapper}>
            <UserDropdown {...restProps} />
          </div>
        ) : (
          <Button as={Link} className={s.loginBtn} to={'/login'} variant={'secondary'}>
            Sign in
          </Button>
        )}
      </div>
    </div>
  )
}
