import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './question-form.module.scss'

import { Button } from '../button'
import { Card } from '../card'
import { FormRadioGroup } from '../controlled/radioGroupForm'
import { RadioOption } from '../radioGroup'
import { Typography } from '../typography'

type QuestionFormProps = {
  deckName: string
  options: RadioOption[]
}

const answerSchema = z.object({
  answer: z.boolean(),
})

type FormValues = z.infer<typeof answerSchema>

export const QuestionForm = ({ deckName, options }: QuestionFormProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(answerSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const classNames = {
    attempt: s.attempt,
    container: s.container,
    header: s.header,
  }

  return (
    <Card className={s.container}>
      <div className={s.formWrapper}>
        <Typography as={'h1'} className={classNames.header} variant={'h1'}>
          Learn “{deckName}”
        </Typography>
        <div className={s.questionSectionWrapper}>
          <div className={s.questionTitle}>
            <Typography as={'span'} variant={'subtitle1'}>
              Question:{' '}
            </Typography>
            <Typography as={'span'} variant={'body1'}>
              How &quot;This&quot; works in JavaScript?
            </Typography>
          </div>
          <div className={s.questionBody}></div>
        </div>
        <Typography className={classNames.attempt} variant={'body2'}>
          Количество попыток ответов на вопрос: 10
        </Typography>
        <div className={s.answerSectionWrapper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography as={'label'} variant={'subtitle2'}>
              Rate yourself:
            </Typography>
            <FormRadioGroup
              className={s.radioGroup}
              control={control}
              name={'answer'}
              options={options}
            />
            <Button fullWidth type={'submit'}>
              Next Question
            </Button>
          </form>
        </div>
      </div>
    </Card>
  )
}
