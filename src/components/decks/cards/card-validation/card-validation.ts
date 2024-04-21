import { z } from 'zod'

export const cardAddScheme = z.object({
  answer: z.string().trim().min(3).max(1000),
  answerImg: z.instanceof(File).nullable().optional(),
  question: z.string().trim().min(3).max(500),
  questionImg: z.instanceof(File).nullable().optional(),
})

export const cardEditScheme = z
  .object({
    answer: z.string().trim().max(1000).optional(),
    answerImg: z.instanceof(File).nullable().optional(),
    question: z.string().trim().max(1000).optional(),
    questionImg: z.instanceof(File).nullable().optional(),
  })
  .refine(data => Boolean((data.question && data.answer) || (data.questionImg && data.answerImg)), {
    message: 'At least question and answer or question image and answer image must be provided',
    path: ['question'],
  })
  .refine(data => !data.question || data.question.length >= 3, {
    message: 'If provided, question must be at least 3 characters long',
    path: ['question'],
  })
  .refine(data => !data.answer || data.answer.length >= 3, {
    message: 'If provided, answer must be at least 3 characters long',
    path: ['answer'],
  })
