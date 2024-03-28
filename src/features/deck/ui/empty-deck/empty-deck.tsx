import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets/icons'
import { AddDeckModal } from '@/components/decks/add-deck-modal'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const EmptyDeck = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <Typography as={Link} to={'/'} variant={'body2'}>
        <ArrowBackIcon />
        Back to Decks List
      </Typography>
      <Typography variant={'h1'}>Deck Name</Typography>
      <Typography variant={'body1'}></Typography>
      <Button onClick={handleOpenChange}>Add New Card</Button>
      <AddDeckModal handleDataConfirm={() => {}} onOpenChange={setIsOpen} open={isOpen}>
        Add New Card
      </AddDeckModal>
    </div>
  )
}
