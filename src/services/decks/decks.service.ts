import { CreateDeckArgs, Deck, DecksResponse, DeleteDecksArgs, GetDecksArgs, UpdateDecksArgs } from "@/services/decks";
import { baseApi } from "@/services";


export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs | void>({
        query: params => ({
          url: `v2/decks`,
          params: params ?? undefined,
        }),
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: args => ({
          url: 'v1/decks',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<Deck, DeleteDecksArgs>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<Deck, UpdateDecksArgs>({
        query: (id, ...args) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body: args,
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = decksService
