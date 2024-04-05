import { Card, MinMaxCardsArgs, baseApi } from '@/services'
import {
  CreateCardArgs,
  CreateDeckArgs,
  Deck,
  DecksResponse,
  DeleteDecksArgs,
  GetDecksArgs,
  PaginatedCardsInDeck,
  PaginatedCardsInDeckParams,
  UpdateDecksArgs,
  UpdateGradeArgs,
} from '@/services/decks'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Omit<Card, 'grade'>, { body: CreateCardArgs; id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ body, id }) => {
          const formData = new FormData()

          formData.append('question', body.question)
          formData.append('answer', body.answer)
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

          return { body: formData, method: 'POST', url: `/v1/decks/${id}/cards` }
        },
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<Deck, DeleteDecksArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<DecksResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: params => ({
          params: params ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxCards: builder.query<MinMaxCardsArgs, void>({
        providesTags: ['Decks'],
        query: () => `/v2/decks/min-max-cards`,
      }),
      getPaginatedCardsInDeck: builder.query<
        PaginatedCardsInDeck,
        { id: string; params?: PaginatedCardsInDeckParams }
      >({
        providesTags: ['Cards'],
        query: ({ id, params }) => ({
          params,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDecksArgs>({
        invalidatesTags: ['Decks'],
        query: (id, ...args) => ({
          body: args,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
      updateGrade: builder.mutation<Card, UpdateGradeArgs>({
        invalidatesTags: ['Cards'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `/v1/decks/${args.cardId}/learn`,
        }),
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useGetPaginatedCardsInDeckQuery,
  useUpdateDeckMutation,
  useUpdateGradeMutation,
} = decksService
