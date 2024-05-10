import { BodyUpdateCard, CardResponse, UpdatedCard, baseApi } from '@/services'

export const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Cards', 'Deck'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `/v1/cards/${id}`,
        }),
      }),
      getCard: builder.query<CardResponse, { id: string }>({
        providesTags: ['Card'],
        query: ({ id }) => ({
          url: `/v1/cards/${id}`,
        }),
      }),
      updateCard: builder.mutation<UpdatedCard, { body: BodyUpdateCard; id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ body, id }) => {
          const formData = new FormData()

          if (body.question) {
            formData.append('question', body.question)
          }
          if (body.answer) {
            formData.append('answer', body.answer)
          }
          if (body.questionImg) {
            formData.append('questionImg', body.questionImg)
          }
          if (body.answerImg) {
            formData.append('answerImg', body.answerImg)
          }
          if (body.questionVideo) {
            formData.append('questionVideo', body.questionVideo)
          }
          if (body.answerVideo) {
            formData.append('answerVideo', body.answerVideo)
          }

          return { body: formData, method: 'PATCH', url: `/v1/cards/${id}` }
        },
      }),
    }
  },
})

export const { useDeleteCardMutation, useGetCardQuery, useUpdateCardMutation } = cardsService
