import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom'

import { Layout, useIsAuth } from './components/layout/layout'
import { Deck } from './features'
import { CheckEmailPage } from './pages/check-email-page'
import { DecksPage } from './pages/deckPage'
import { ForgotPasswordPage } from './pages/forgot-password-page'
import { ProfilePage } from './pages/profile-page'
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
      {
        element: <ForgotPasswordPage />,
        path: '/password',
      },
      {
        element: <CheckEmailPage />,
        path: '/checkEmail',
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    index: true,
  },
  {
    element: <DecksPage />,
    path: '/decks',
  },
  {
    element: <ProfilePage />,
    path: '/profile',
  },
  {
    element: <Deck />,
    path: '/decks/:deckId/cards',
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
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  debugger
  const isAuth = useIsAuth()
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate state={{ from: location }} to={'/login'} />
}
