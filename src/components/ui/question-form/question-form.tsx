import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormRadioGroup } from '@/components/ui/controlled/controlledRadioGroup'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './question-form.module.scss'

import { Button } from '../button'
import { Card } from '../card'
import { RadioItem } from '../radioGroup'
import { Typography } from '../typography'

type QuestionFormProps = {
  card: any
  deckName: string
}

const answerSchema = z.object({
  answer: z.boolean(),
})

type FormValues = z.infer<typeof answerSchema>

export const QuestionForm = ({ card, deckName }: QuestionFormProps) => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false)
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

  const changeSetAnswers = () => {
    setShowAnswers(true)
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
              Question:
            </Typography>
            <Typography as={'span'} variant={'body1'}>
              {card.question}
            </Typography>
          </div>
          <div className={s.questionBody}></div>
        </div>
        <Typography className={classNames.attempt} variant={'body2'}>
          The number of attempts to answer the question: {card.shots}
        </Typography>
        {showAnswers ? (
          <div className={s.answerSectionWrapper}>
            <div className={s.answerTitle}>
              <Typography as={'span'} variant={'subtitle1'}>
                Answer:
              </Typography>
              <Typography as={'span'} variant={'body1'}>
                {card.question}
              </Typography>
            </div>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <Typography as={'label'} variant={'subtitle1'}>
                Rate yourself:
              </Typography>
              <FormRadioGroup className={s.radioGroup} control={control} name={'answer'}>
                <RadioItem label={'Did not know'} value={'option 1'} />
                <RadioItem label={'Forgot'} value={'option 2'} />
                <RadioItem label={'A lot of thought'} value={'option 3'} />
                <RadioItem label={'Сonfused'} value={'option 4'} />
                <RadioItem label={'Knew the answer'} value={'option 5'} />
              </FormRadioGroup>
              <Button fullWidth type={'submit'}>
                Next Question
              </Button>
            </form>
          </div>
        ) : (
          <Button fullWidth onClick={changeSetAnswers}>
            Show Answer
          </Button>
        )}
      </div>
    </Card>
  )
}
