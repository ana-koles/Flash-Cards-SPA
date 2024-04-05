import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets/icons'
import { CardsTable } from '@/components/decks'
import { AddCardModal } from '@/components/decks/cards/add-card-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MenuBurger } from '@/components/ui/menuBurger/menuBurger'
import { Pagination } from '@/components/ui/pagination'
import { Typography } from '@/components/ui/typography'
import { CreateCardArgs, useCreateCardMutation, useGetPaginatedCardsInDeckQuery } from '@/services'

import s from './deck.module.scss'

export const Deck = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuestion, SetSearhQuestion] = useState('')

  const { deckId = '' } = useParams()
  const { data: deckData } = useGetPaginatedCardsInDeckQuery({
    id: deckId,
    params: { currentPage, itemsPerPage, question: searchQuestion },
  })
  const [createCard, {}] = useCreateCardMutation()

  const cards = deckData?.items
  const totalItemsCount = deckData?.pagination.totalItems || 0

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

  const handleChangeCurrentPage = (value: number) => {
    setCurrentPage(value)
  }

  const handleChangeItemsPerPage = (value: number) => {
    setItemsPerPage(value)
  }

  const handleAddCard = (id: string, body: CreateCardArgs) => {
    createCard({ body, id })
  }

  return (
    <div>
      <Typography as={Link} className={classNames.linkBack} to={'/decks'} variant={'body2'}>
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
        <AddCardModal
          handleDataConfirm={body => handleAddCard(deckId, body)}
          onOpenChange={setIsOpen}
          open={isOpen}
        >
          Add New Card
        </AddCardModal>
      </div>
      <Input
        className={classNames.searchInput}
        onValueChange={SetSearhQuestion}
        placeholder={'Input search'}
        search
      />
      <CardsTable cards={cards} isMyDeck={isMyDeck} onEditClick={() => {}} />
      <Pagination
        className={classNames.pagination}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handleChangeCurrentPage}
        onPerPageChange={handleChangeItemsPerPage}
        perPageOptions={perPageOptions}
        totalItemsCount={totalItemsCount}
      />
    </div>
  )
}
