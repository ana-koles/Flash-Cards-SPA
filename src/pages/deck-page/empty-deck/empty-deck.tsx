import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets/icons'
import { AddCardModal } from '@/components/decks/cards/add-card-modal'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './empty-deck.module.scss'

export const EmptyDeck = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = () => {
    setIsOpen(true)
  }

  const classNames = {
    buttonAdd: s.buttonAdd,
    caption: s.caption,
    container: s.container,
    link: s.link,
  }

  return (
    <div className={classNames.container}>
      <Typography as={Link} className={classNames.link} to={'/'} variant={'body2'}>
        <ArrowBackIcon />
        Back to Decks List
      </Typography>
      <Typography variant={'h1'}>Deck Name</Typography>
      <Typography className={classNames.caption} variant={'body1'}>
        This pack is empty. Click add new card to fill this pack
      </Typography>
      <Button className={classNames.buttonAdd} onClick={handleOpenChange}>
        Add New Card
      </Button>
      <AddCardModal handleDataConfirm={() => {}} onOpenChange={setIsOpen} open={isOpen}>
        Add New Card
      </AddCardModal>
    </div>
  )
}
