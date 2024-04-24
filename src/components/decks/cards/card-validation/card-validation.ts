import { z } from 'zod'

export const cardScheme = z.object({
  answer: z.string().trim().min(3).max(1000),
  answerImg: z.instanceof(File).nullable().optional(),
  question: z.string().trim().min(3).max(500),
  questionImg: z.instanceof(File).nullable().optional(),
})
