import { Link } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets'
import { AddCardModal, Typography } from '@/components'
import { CreateCardArgs, Deck, useCreateCardMutation } from '@/services'

import s from './empty-deck.module.scss'

export type EmptyDeckProps = {
  deck: Deck
}

export const EmptyDeck = ({ deck }: EmptyDeckProps) => {
  const [createCard, {}] = useCreateCardMutation()
  const classNames = {
    buttonAdd: s.buttonAdd,
    caption: s.caption,
    container: s.container,
    link: s.link,
  }

  const handleAddCard = (id: string, body: CreateCardArgs) => {
    createCard({ body, id })
  }

  return (
    <div className={classNames.container}>
      <Typography as={Link} className={classNames.link} to={'/'} variant={'body2'}>
        <ArrowBackIcon />
        Back to Decks List
      </Typography>
      <Typography variant={'h1'}>{deck.name}</Typography>
      <Typography className={classNames.caption} variant={'body1'}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      <div className={classNames.buttonAdd}>
        <AddCardModal handleDataConfirm={body => handleAddCard(deck.id, body)} />
      </div>
    </div>
  )
}
