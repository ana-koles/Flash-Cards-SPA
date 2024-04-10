import { baseApi } from '../base-api'
import {
  LoginData,
  LoginResponse,
  RecoverPasswordData,
  ResetPasswordData,
  SignUpBody,
  UpdateUserDataArgs,
  UserData,
  VerifyEmailData,
} from './auth.types'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, LoginData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: 'POST',
          url: 'v1/auth/login',
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Auth'],
        query: () => ({
          method: 'POST',
          url: 'v1/auth/logout',
        }),
      }),
      me: builder.query<UserData, void>({
        providesTags: ['Auth'],
        query: () => ({
          url: 'v1/auth/me',
        }),
      }),
      passwordRecover: builder.mutation<void, RecoverPasswordData>({
        query: params => ({
          body: params,
          method: 'POST',
          url: 'v1/auth/recover-password',
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordData>({
        query: params => ({
          body: params.password,
          method: 'POST',
          url: `v1/auth/reset-password/${params.token}`,
        }),
      }),
      signUp: builder.mutation<UserData, SignUpBody>({
        //invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: 'POST',
          url: 'v1/auth/sign-up',
        }),
      }),
      updateUserData: builder.mutation<UserData, UpdateUserDataArgs>({
        invalidatesTags: ['Auth'],
        query: args => {
          const formData = new FormData()

          if (args.avatar) {
            formData.append('avatar', args.avatar)
          }
          if (args.name) {
            formData.append('name', args.name)
          }

          return {
            body: formData,
            method: 'PATCH',
            url: 'v1/auth/me',
          }
        },
      }),
      verifyyEmail: builder.mutation<void, VerifyEmailData>({
        query: params => ({
          body: params,
          method: 'POST',
          url: 'v1/auth/verify-email',
        }),
      }),
    }
  },
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoverMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
} = authService
