import { Link, useNavigate, useParams } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets'
import { Loader, QuestionForm, Typography } from '@/components'
import { useGetDeckQuery, useGetRandomCardQuery, useUpdateGradeMutation } from '@/services'

import s from './learn-cards-page.module.scss'

export const LearnCardsPage = () => {
  const { deckId = '' } = useParams()
  const { data: deckData } = useGetDeckQuery({ id: deckId })
  const { data: cardData } = useGetRandomCardQuery({ id: deckId })
  const [updateGrade, { data: randomCardData, isLoading: isRandomCardLoading }] =
    useUpdateGradeMutation()

  const card = randomCardData || cardData
  const cardId = randomCardData?.id || cardData?.id || ''
  const navigate = useNavigate()

  const handleUpdateGrade = (grade: number) => {
    updateGrade({ cardId, grade, id: deckId })
  }

  const classNames = {
    content: s.content,
    formWrapper: s.formWrapper,
    linkBack: s.linkBack,
  }

  if (isRandomCardLoading) {
    return <Loader />
  }

  if (!card) {
    navigate('/noCards')
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
