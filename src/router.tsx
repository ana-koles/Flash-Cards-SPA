import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom'

import { Layout, useIsAuth } from './components/layout/layout'
import { DecksPage } from './pages/deckPage'
import { SignInPage } from './pages/signIn-page'
import { SignUpPage } from './pages/signUp-page'

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignInPage />,
        path: '/login',
      },
      {
        element: <SignUpPage />,
        path: '/signUp',
      },
      {
        element: <SignInPage />,
        path: '/logout',
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
]

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuth = useIsAuth()
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate state={{ from: location }} to={'/login'} />
}
