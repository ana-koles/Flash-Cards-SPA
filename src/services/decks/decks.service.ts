import {
  CardResponse,
  CreateCardArgs,
  CreateDeckArgs,
  Deck,
  DecksResponse,
  DeleteDecksArgs,
  GetDecksArgs,
  GetRandomCardArgs,
  MinMaxCardsArgs,
  PaginatedCardsInDeck,
  PaginatedCardsInDeckParams,
  UpdateDecksArgs,
  UpdateGradeArgs,
  baseApi,
} from '@/services'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<
        Omit<CardResponse, 'grade'>,
        { body: CreateCardArgs; id: string }
      >({
        invalidatesTags: ['Cards', 'Deck'],
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
            url: `v1/decks`,
          }
        },
      }),
      deleteDeck: builder.mutation<Deck, DeleteDecksArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          let patchResult: any

          for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
            getState(),
            [{ type: 'Decks' }]
          )) {
            if (endpointName != 'getDecks') {
              continue
            }
            patchResult = dispatch(
              decksService.util.updateQueryData(endpointName, originalArgs, draft => {
                const index = draft.items.findIndex(deck => deck.id === id)

                if (index > -1) {
                  draft.items.splice(index, 1)
                }
              })
            )
          }

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDeck: builder.query<Deck, { id: string }>({
        providesTags: ['Deck'],
        query: ({ id }) => ({
          url: `/v1/decks/${id}`,
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
      getRandomCard: builder.query<CardResponse, GetRandomCardArgs>({
        providesTags: ['RandomCard'],
        query: ({ id, previousCardId }) => ({
          params: { previousCardId },
          url: `/v1/decks/${id}/learn`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDecksArgs>({
        invalidatesTags: ['Decks', 'Deck'],
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
      updateGrade: builder.mutation<CardResponse, UpdateGradeArgs>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...args }) => ({
          body: args,
          method: 'POST',
          url: `/v1/decks/${id}/learn`,
        }),
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useGetPaginatedCardsInDeckQuery,
  useGetRandomCardQuery,
  useUpdateDeckMutation,
  useUpdateGradeMutation,
} = decksService
