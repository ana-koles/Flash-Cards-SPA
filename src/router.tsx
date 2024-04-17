/* import { Redirect } from 'react-router' */
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout, useIsAuth } from './components/layout/layout'
import { LearnCardsPage } from './pages'
import { DeckPage } from './pages/deck-page'
import { DecksPage } from './pages/decks-page'
import { NotFoundPage } from './pages/not-found-page'
import { ProfilePage } from './pages/profile-page'
import { publicRoutesList } from './utils/routes'

const publicRoutes: RouteObject[] = [
  {
    children: [...publicRoutesList.protectedRoutes, ...publicRoutesList.openRoutes],
    /*     children: [
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
    ], */
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
    element: <DeckPage />,
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

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
