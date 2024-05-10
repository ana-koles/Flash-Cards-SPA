export type CardResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type UpdatedCard = Omit<CardResponse, 'grade'>

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type BodyUpdateCard = AtLeastOne<{
  answer?: string
  answerImg?: File | null
  answerVideo?: File | null
  question?: string
  questionImg?: File | null
  questionVideo?: File | null
}>
