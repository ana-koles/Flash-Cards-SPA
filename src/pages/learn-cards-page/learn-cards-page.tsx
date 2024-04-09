import { Link, useParams } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets/icons'
import { QuestionForm } from '@/components/ui/question-form'
import { Typography } from '@/components/ui/typography'
import { useGetDeckQuery, useGetRandomCardQuery, useUpdateGradeMutation } from '@/services'

export const LearnCardsPage = () => {
  const { deckId = '' } = useParams()
  const { data: deckData } = useGetDeckQuery({ id: deckId })
  const { data: cardData } = useGetRandomCardQuery({ id: deckId })
  const [updateGrade, { data: randomCardData }] = useUpdateGradeMutation()

  const card = randomCardData || cardData
  const cardId = cardData?.id || ''

  const handleUpdateGrade = (grade: number) => {
    updateGrade({ cardId, grade })
  }

  return (
    <div>
      <Typography as={Link} to={`/decks/${deckId}/cards`} variant={'body2'}>
        <ArrowBackIcon />
        Back to Deck List
      </Typography>
      <QuestionForm card={card} deckName={deckData?.name || ''} onSaveGrade={handleUpdateGrade} />
    </div>
  )
}
