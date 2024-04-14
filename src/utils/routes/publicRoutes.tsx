import { CheckEmailPage } from '@/pages/check-email-page'
import { ConfirmEmailPage } from '@/pages/confirm-email-page'
import { CreateNewPasswordPage } from '@/pages/create-new-password-page'
import { ForgotPasswordPage } from '@/pages/forgot-password-page'
import { SignInPage } from '@/pages/signIn-page'
import { SignUpPage } from '@/pages/signUp-page'

export const publicRoutesList = {
  openRoutes: [
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
  ],
  protectedRoutes: [
    {
      element: <CreateNewPasswordPage />,
      path: '/newPassword',
    },
    {
      element: <ConfirmEmailPage />,
      path: '/confirmEmail',
    },
  ],
}
