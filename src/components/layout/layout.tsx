import { Outlet } from 'react-router-dom'

import { Header } from './header'

/* type LayoutProps = {
  children: ReactNode
} & HeaderProps
 */
export const Layout = () => {
  const isLogedIn = true
  const isAuth = true
  const logout = () => {}

  return (
    <div>
      <Header isAuth={isAuth} isLogedIn={isLogedIn} logout={logout} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
