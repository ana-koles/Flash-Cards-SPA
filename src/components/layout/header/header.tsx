import logo from '@/assets/logo/logo.png'
import { Button } from '@/components/ui/button'
import { DropdownMenuUserProps, UserDropdown } from '@/components/ui/userDropdown/userDropdown'

import s from './header.module.scss'

type HeaderProps = {
  isLogedIn: boolean
  userData: DropdownMenuUserProps
}

export const Header = ({ isLogedIn, userData }: HeaderProps) => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.headerContent}>
        <img alt={'logo'} className={s.logo} src={logo} />
        {isLogedIn ? (
          <Button variant={'secondary'}>Sign in</Button>
        ) : (
          <div className={s.menuWrapper}>
            <UserDropdown {...userData} />
          </div>
        )}
      </div>
    </div>
  )
}
