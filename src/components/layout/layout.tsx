import { Outlet, useLocation, useOutletContext } from 'react-router-dom'

import { useLogoutMutation, useMeQuery, useUpdateUserDataMutation } from '@/services/auth'

import { Header } from './header'

type ContextType = {
  isAuth: boolean
}

export const Layout = () => {
  const [logout] = useLogoutMutation()
  const [updateUserData] = useUpdateUserDataMutation()
  const shouldSkip = useLocation().pathname === '/newPassword'

  const {
    data,
    isError,
    isLoading: isMeDataRequesting,
  } = useMeQuery(undefined, {
    skip: shouldSkip,
  })

  const isAuth = !isError && !isMeDataRequesting && !shouldSkip
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
