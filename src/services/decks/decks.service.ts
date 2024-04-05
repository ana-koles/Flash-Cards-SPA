import { MinMaxCardsArgs, baseApi } from '@/services'
import {
  CreateDeckArgs,
  Deck,
  DecksResponse,
  DeleteDecksArgs,
  GetDecksArgs,
  UpdateDecksArgs,
} from '@/services/decks'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => {
          const formData = new FormData()

          formData.append('name', args.name)
          if (args.isPrivate) {
            formData.append('isPrivate', args.isPrivate.toString())
          }
          if (args.cover) {
            formData.append('cover', args.cover)
          }

          return {
            body: formData,
            method: 'POST',
            url: 'v1/decks',
          }
        },
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
      updateDeck: builder.mutation<Deck, UpdateDecksArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...args }) => {
          const formData = new FormData()

          if (args.name) {
            formData.append('name', args.name)
          }
          if (args.isPrivate) {
            formData.append('isPrivate', args.isPrivate.toString())
          }
          if (args.cover) {
            formData.append('cover', args.cover)
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} = decksService
