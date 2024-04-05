import { BodyUpdateCard, Card, UpdatedCard, baseApi } from '@/services'

export const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `/v1/cards/${id}`,
        }),
      }),
      getCard: builder.query<Card, { id: string }>({
        providesTags: ['Card'],
        query: ({ id }) => ({
          url: `/v1/cards/${id}`,
        }),
      }),
      updateCard: builder.mutation<UpdatedCard, { body: BodyUpdateCard; id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ body, id }) => ({
          body,
          method: 'PATCH',
          url: `/v1/cards/${id}`,
        }),
      }),
    }
  },
})

export const { useDeleteCardMutation, useGetCardQuery, useUpdateCardMutation } = cardsService
