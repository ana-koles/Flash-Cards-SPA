import { baseApi } from '../baseApi'
import { SignUpBody, UserData } from './auth.types'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
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

export const { useSignUpMutation } = authService
