import { baseApi } from '../baseApi'
import { LoginData, LoginResponse, SignUpBody, UserData } from './auth.types'

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

export const { useLoginMutation, useSignUpMutation } = authService
