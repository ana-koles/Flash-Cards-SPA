import { Link } from 'react-router-dom'

import { logo } from '@/assets'
import { Button, DropdownMenuUserProps, UserDropdown } from '@/components'
import { UpdateUserDataArgs } from '@/services'

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
