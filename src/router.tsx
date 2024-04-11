/* import { Redirect } from 'react-router' */
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
import { LearnCardsPage } from './pages'
import { CheckEmailPage } from './pages/check-email-page'
import { ConfirmEmailPage } from './pages/confirm-email-page'
import { CreateNewPasswordPage } from './pages/create-new-password-page'
import { DecksPage } from './pages/deck-page'
import { ForgotPasswordPage } from './pages/forgot-password-page'
import { NotFoundPage } from './pages/not-found-page'
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
        path: '/sign-up',
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
      {
        element: <CreateNewPasswordPage />,
        path: '/newPassword',
      },
      {
        element: <ConfirmEmailPage />,
        path: '/confirmEmail',
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
  {
    element: <LearnCardsPage />,
    path: '/decks/:deckId/learn',
  },
  {
    element: <NotFoundPage />,
    path: '/404',
  },
  {
    element: <Navigate to={'/404'} />,
    path: '/*',
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
  const isAuth = useIsAuth()
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate state={{ from: location }} to={'/login'} />
}
