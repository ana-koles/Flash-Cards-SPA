import { baseApi } from '../baseApi'
import { LoginData, LoginResponse, SignUpBody, UserData } from './auth.types'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<UserData, void>({
        providesTags: ['Auth'],
        query: () => `/v1/auth/me`,
      }),
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
      signUp: builder.mutation<UserData, SignUpBody>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: 'POST',
          url: 'v1/auth/sign-up',
        }),
      }),
    }
  },
})

export const { useAuthMeQuery, useLoginMutation, useSignUpMutation } = authService
