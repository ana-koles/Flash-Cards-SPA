import { baseApi } from '@/services'
import {
  CreateDeckArgs,
  Deck,
  DecksResponse,
  DeleteDecksArgs,
  GetDecksArgs,
  PaginatedCardsInDeck,
  PaginatedCardsInDeckParams,
  UpdateDecksArgs,
} from '@/services/decks'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
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
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetPaginatedCardsInDeckQuery,
  useUpdateDeckMutation,
} = decksService
