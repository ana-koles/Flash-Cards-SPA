import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { CardResponse } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './question-form.module.scss'

import { Button } from '../button'
import { Card } from '../card'
import { FormRadioGroup } from '../controlled/controlled-radio-group'
import { RadioItem } from '../radio-group'
import { Typography } from '../typography'

type QuestionFormProps = {
  card: CardResponse
  deckName: string
  onSaveGrade: (grade: number) => void
}

const answerSchema = z.object({
  answer: z.string(),
})

type FormValues = z.infer<typeof answerSchema>

export const QuestionForm = ({ card, deckName, onSaveGrade }: QuestionFormProps) => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false)
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(answerSchema),
  })

  const onSubmit = (data: FormValues) => {
    onSaveGrade(Number(data.answer))
    setShowAnswers(false)
  }

  const classNames = {
    answerImage: s.answerImage,
    attempt: s.attempt,
    container: s.container,
    header: s.header,
    questionImage: s.questionImage,
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
            <div>
              <Typography as={'span'} variant={'subtitle1'}>
                Question:{' '}
              </Typography>
              <Typography as={'span'} variant={'body1'}>
                {card?.question}
              </Typography>
            </div>
            {card.questionImg && (
              <img
                alt={'question image'}
                className={classNames.questionImage}
                src={card.questionImg}
              />
            )}
          </div>
          <div className={s.questionBody}></div>
        </div>
        <Typography className={classNames.attempt} variant={'body2'}>
          The number of attempts to answer the question: {card?.shots}
        </Typography>
        {showAnswers ? (
          <div className={s.answerSectionWrapper}>
            <div className={s.answerTitle}>
              <div>
                <Typography as={'span'} variant={'subtitle1'}>
                  Answer:{' '}
                </Typography>
                <Typography as={'span'} variant={'body1'}>
                  {card?.answer}
                </Typography>
              </div>
              {card.answerImg && (
                <img alt={'answer image'} className={classNames.answerImage} src={card.answerImg} />
              )}
            </div>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <Typography as={'label'} variant={'subtitle1'}>
                Rate yourself:
              </Typography>
              <FormRadioGroup className={s.radioGroup} control={control} name={'answer'}>
                <RadioItem label={'Did not know'} value={'1'} />
                <RadioItem label={'Forgot'} value={'2'} />
                <RadioItem label={'A lot of thought'} value={'3'} />
                <RadioItem label={'Сonfused'} value={'4'} />
                <RadioItem label={'Knew the answer'} value={'5'} />
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
