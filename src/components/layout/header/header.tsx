import { Link } from 'react-router-dom'

import logo from '@/assets/logo/logo.png'
import { Button } from '@/components/ui/button'
import { UserDropdown } from '@/components/ui/user-dropdown'
import { UpdateUserDataArgs } from '@/services/auth/auth.types'

import s from './header.module.scss'

export type HeaderProps = {
  isAuth: boolean

  updateUserData: (updatedUserData: UpdateUserDataArgs) => void
} & DropdownMenuUserProps
export const Header = ({ isAuth, ...restProps }: HeaderProps) => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.headerContent}>
        {isAuth ? (
          <>
            <Link to={'/'}>
              <img alt={'logo'} className={s.logo} src={logo} />
            </Link>
            <div className={s.menuWrapper}>
              <UserDropdown {...restProps} />
            </div>
          </>
        ) : (
          <>
            <Link to={'/login'}>
              <img alt={'logo'} className={s.logo} src={logo} />
            </Link>
            <Button as={Link} className={s.loginBtn} to={'/login'} variant={'secondary'}>
              Sign in
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
