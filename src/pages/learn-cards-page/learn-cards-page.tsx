import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets'
import { Loader, QuestionForm, Typography } from '@/components'
import { useGetDeckQuery, useGetRandomCardQuery, useUpdateGradeMutation } from '@/services'

import s from './learn-cards-page.module.scss'

export const LearnCardsPage = () => {
  const { deckId = '' } = useParams()
  const { data: deckData, isLoading: isDeckLoading } = useGetDeckQuery({ id: deckId })
  const { data: cardData, isLoading: isCardLoading } = useGetRandomCardQuery({ id: deckId })
  const [updateGrade] = useUpdateGradeMutation()

  const card = cardData
  const cardId = cardData?.id || ''
  const navigate = useNavigate()

  const handleUpdateGrade = (grade: number) => {
    updateGrade({ cardId, grade, id: deckId })
  }

  useEffect(() => {
    if (!card && !isDeckLoading && !isCardLoading) {
      navigate('/noCards')
    }
  }, [card, navigate, isDeckLoading, isCardLoading])

  const classNames = {
    content: s.content,
    formWrapper: s.formWrapper,
    linkBack: s.linkBack,
  }

  if (isCardLoading || isDeckLoading) {
    return <Loader />
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
