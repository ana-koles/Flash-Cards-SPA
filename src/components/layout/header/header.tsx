import { Link } from 'react-router-dom'

import cardsLogo from '@/assets/images/cards-logo.png'
import quizLogo from '@/assets/images/quiz-logo.png'
import { Button } from '@/components/ui/button'
import { UserData, UserDropdown } from '@/components/ui/user-dropdown'
import { UpdateUserDataArgs } from '@/services/auth/auth.types'

import s from './header.module.scss'

export type HeaderProps = {
  isAuth: boolean
  logout: () => void
  updateUserData: (updatedUserData: UpdateUserDataArgs) => void
  userData?: UserData
}
export const Header = ({ isAuth, ...restProps }: HeaderProps) => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.headerContent}>
        {isAuth ? (
          <>
            <Link to={'/'}>
              <img alt={'logo'} className={s.quiz} src={quizLogo} />
              <img alt={'logo'} className={s.logo} src={cardsLogo} />
            </Link>
            <div className={s.menuWrapper}>
              <UserDropdown {...restProps} />
            </div>
          </>
        ) : (
          <>
            <Link to={'/login'}>
              <img alt={'logo'} className={s.logo} src={quizLogo} />
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
