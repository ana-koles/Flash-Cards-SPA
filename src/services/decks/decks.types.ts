import { CardResponse } from '..'

export type DecksResponse = {
  items: Deck[]
  pagination: Pagination
}
export type DeckAuthor = {
  id: string
  name: string
}
export type Deck = {
  author: DeckAuthor
  cardsCount: number
  cover?: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}
export type CreateDeckArgs = {
  cover?: File | string
  isPrivate?: boolean
  name: string
}
export type DeleteDecksArgs = {
  id: string
}
export type UpdateDecksArgs = {
  cover?: File | string
  id: string
  isPrivate?: boolean
  name?: string
}

export type PaginatedCardsInDeck = {
  items: CardResponse[]
  pagination: Pagination
}

export type PaginatedCardsInDeckParams = {
  answer?: number
  currentPage?: number
  itemsPerPage?: number
  orderBy?: number
  question?: string
}

export type MinMaxCardsArgs = {
  max: number
  min: number
}

export type UpdateGradeArgs = {
  cardId: string
  grade: number
}

export type CreateCardArgs = {
  answer: string
  answerImg?: File | null
  answerVideo?: File | null
  question: string
  questionImg?: File | null
  questionVideo?: File | null
}

export type GetRandomCardArgs = {
  id: string
  previousCardId?: string
}
