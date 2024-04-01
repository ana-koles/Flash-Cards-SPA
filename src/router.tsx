import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DecksPage } from './pages/decks-page'
import { SignInPage } from './pages/signIn-page'
import { SignUpPage } from './pages/signUp-page'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <SignUpPage />,
    path: '/signUp',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  {
    children: publicRoutes,
    element: <PublicRoutes />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthentificated = true

  return isAuthentificated ? <Outlet /> : <Navigate to={'/login'} />
}

function PublicRoutes() {
  const isAuthentificated = false

  return isAuthentificated ? <Navigate to={'/'} /> : <Outlet />
}
