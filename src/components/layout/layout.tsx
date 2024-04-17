import { Outlet, useOutletContext } from 'react-router-dom'

import { useLogoutMutation, useMeQuery, useUpdateUserDataMutation } from '@/services/auth'

import s from './layout.module.scss'

import { Header } from './header'

type ContextType = {
  isAuth: boolean
}

export const Layout = () => {
  const [logout] = useLogoutMutation()
  const [updateUserData] = useUpdateUserDataMutation()

  const { data, isError, isLoading: isMeDataRequesting } = useMeQuery()

  const isAuth = !isError && !isMeDataRequesting
  const userData = {
    avatar: data?.avatar,
    email: data?.email,
    name: data?.name,
  }

  return (
    <div className={s.layout}>
      <Header isAuth={isAuth} logout={logout} updateUserData={updateUserData} {...userData} />
      <Outlet context={{ isAuth } satisfies ContextType} />
    </div>
  )
}

export function useIsAuth() {
  return useOutletContext<ContextType>()
}
