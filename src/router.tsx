/* import { Redirect } from 'react-router' */
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout, useIsAuth } from '@/components'
import { DeckPage, DecksPage, LearnCardsPage, NotFoundPage, ProfilePage } from '@/pages'

import { NoCardsPage } from './pages/no-cards-page/no-cards-page'
import { publicRoutesList } from './utils/routes'

const publicRoutes: RouteObject[] = [
  {
    children: [...publicRoutesList.protectedRoutes, ...publicRoutesList.openRoutes],
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
    element: <NoCardsPage />,
    path: '/noCards',
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
