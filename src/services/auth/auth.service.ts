import { baseApi } from '../baseApi'
import {
  LoginData,
  LoginResponse,
  RecoverPasswordData,
  ResetPasswordData,
  SignUpBody,
  UpdateUserDataArgs,
  UserData,
} from './auth.types'

type ExtraOptions = {
  skipMeRequest?: boolean
}

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
        //invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: 'POST',
          url: 'v1/auth/recover-password',
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params.password,
          method: 'POST',
          url: `v1/auth/reset-password/${params.token}`,
        }),
      }),
      signUp: builder.mutation<UserData, SignUpBody>({
        invalidatesTags: ['Auth'],
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
