import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets'
import { QuestionForm, Typography } from '@/components'
import { useGetDeckQuery, useGetRandomCardQuery, useUpdateGradeMutation } from '@/services'

import s from './learn-cards-page.module.scss'

export const LearnCardsPage = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const { deckId = '' } = useParams()
  const { data: deckData } = useGetDeckQuery({ id: deckId })
  const { data: cardData } = useGetRandomCardQuery({ id: deckId })
  const [updateGrade, { data: randomCardData }] = useUpdateGradeMutation()

  const card = isFirstLoading ? cardData : randomCardData
  const cardId = randomCardData?.id || cardData?.id || ''

  const handleUpdateGrade = (grade: number) => {
    updateGrade({ cardId, grade, id: deckId })
    setIsFirstLoading(false)
  }

  const classNames = {
    content: s.content,
    formWrapper: s.formWrapper,
    linkBack: s.linkBack,
  }

  return (
    <div className={s.content}>
      <Typography
        as={Link}
        className={classNames.linkBack}
        to={`/decks/${deckId}/cards`}
        variant={'body2'}
      >
        <ArrowBackIcon />
        Back to Deck List
      </Typography>
      <div className={classNames.formWrapper}>
        {card && (
          <QuestionForm
            card={card}
            deckName={deckData?.name || ''}
            onSaveGrade={handleUpdateGrade}
          />
        )}
      </div>
    </div>
  )
}
