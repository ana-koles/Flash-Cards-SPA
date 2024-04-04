import { Outlet, useOutletContext } from 'react-router-dom'

import { useLogoutMutation, useMeQuery } from '@/services/auth'

import { Header } from './header'

type ContextType = {
  isAuth: boolean
}

export const Layout = () => {
  const { data, isError, isLoading: isMeDataRequesting } = useMeQuery()
  const [logout] = useLogoutMutation()

  const isAuth = !isError && !isMeDataRequesting
  const userData = {
    avatar: data?.avatar,
    email: data?.email,
    name: data?.name,
  }

  return (
    <div>
      <Header isAuth={isAuth} logout={logout} userData={userData} />
      <Outlet context={{ isAuth } satisfies ContextType} />
    </div>
  )
}

export function useIsAuth() {
  return useOutletContext<ContextType>()
}
