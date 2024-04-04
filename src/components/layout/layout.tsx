import { Outlet, useOutletContext } from 'react-router-dom'

import { useLogoutMutation, useMeQuery, useUpdateUserDataMutation } from '@/services/auth'

import { Header } from './header'

type ContextType = {
  isAuth: boolean
}

export const Layout = () => {
  const { data, isError, isLoading: isMeDataRequesting } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [updateUserData] = useUpdateUserDataMutation()

  const isAuth = !isError && !isMeDataRequesting
  const userData = {
    avatar: data?.avatar,
    email: data?.email,
    name: data?.name,
  }

  return (
    <div>
      <Header isAuth={isAuth} logout={logout} updateUserData={updateUserData} userData={userData} />
      <Outlet context={{ isAuth } satisfies ContextType} />
    </div>
  )
}

export function useIsAuth() {
  return useOutletContext<ContextType>()
}
