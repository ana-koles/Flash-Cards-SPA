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
    index: true,
  },
  {
    element: <DecksPage />,
    path: '/decks',
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
  // debugger

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuth = useIsAuth()
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate state={{ from: location }} to={'/login'} />
}
