import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets/icons'
import { CardsTable } from '@/components/decks'
import { AddDeckModal } from '@/components/decks/add-deck-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MenuBurger } from '@/components/ui/menuBurger/menuBurger'
import { Pagination } from '@/components/ui/pagination'
import { Typography } from '@/components/ui/typography'
import { Card } from '@/services'

import s from './deck.module.scss'

export const Deck = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isOpen, setIsOpen] = useState(false)

  const cards: Card[] = []

  const classNames = {
    linkBack: s.linkBack,
    pagination: s.pagination,
    searchInput: s.searchInput,
    title: s.title,
    titleContainer: s.titleContainer,
  }
  const perPageOptions = [10, 20, 30, 50, 100]
  const isMyDeck = true

  const handleOpenChange = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <Typography as={Link} className={classNames.linkBack} to={'/'} variant={'body2'}>
        <ArrowBackIcon />
        Back to Decks List
      </Typography>
      <div className={classNames.titleContainer}>
        <div className={classNames.title}>
          <Typography variant={'h1'}>Deck Name</Typography>
          {isMyDeck && <MenuBurger />}
        </div>
        {isMyDeck ? (
          <Button onClick={handleOpenChange}>Add New Card</Button>
        ) : (
          <Button as={Link} to={'#'}>
            Learn to Pack
          </Button>
        )}
        <AddDeckModal handleDataConfirm={() => {}} onOpenChange={setIsOpen} open={isOpen}>
          Add New Card
        </AddDeckModal>
      </div>
      <Input className={classNames.searchInput} placeholder={'Input search'} search />
      <CardsTable cards={cards} isMyDeck={isMyDeck} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onPerPageChange={setItemsPerPage}
        perPageOptions={perPageOptions}
        totalItemsCount={300}
      />
    </div>
  )
}
