import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets/icons'
import { AddCardModal } from '@/components/decks/cards/add-card-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MenuBurger } from '@/components/ui/menu-burger/menu-burger'
import { Pagination } from '@/components/ui/pagination'
import { Typography } from '@/components/ui/typography'
import {
  CreateCardArgs,
  UpdateDecksArgs,
  useCreateCardMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetPaginatedCardsInDeckQuery,
  useUpdateDeckMutation,
} from '@/services'
import { useMeQuery } from '@/services/auth'

import s from './deck.module.scss'

import { CardsTable, ColumnsSortable, SortOrder } from './cards-table'

export const DeckPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuestion, SetSearhQuestion] = useState('')
  const [sortBy, setSortBy] = useState<{ direction: SortOrder; key: ColumnsSortable | null }>({
    direction: 'asc',
    key: null,
  })

  const orderBy = `${sortBy.key}-${sortBy.direction}`

  const navigate = useNavigate()
  const { deckId = '' } = useParams()
  const { data: cardsData } = useGetPaginatedCardsInDeckQuery({
    id: deckId,
    params: {
      currentPage,
      itemsPerPage,
      orderBy: sortBy.key ? orderBy : undefined,
      question: searchQuestion,
    },
  })
  const [createCard, {}] = useCreateCardMutation()
  const { data: deckData } = useGetDeckQuery({ id: deckId })
  const { data: meData } = useMeQuery()
  const [deleteDeck, {}] = useDeleteDeckMutation()
  const [updateDeck, {}] = useUpdateDeckMutation()

  const cards = cardsData?.items
  const totalItemsCount = cardsData?.pagination.totalItems || 0

  const classNames = {
    content: s.content,
    deckImage: s.deckImage,
    linkBack: s.linkBack,
    pagination: s.pagination,
    searchInput: s.searchInput,
    title: s.title,
    titleContainer: s.titleContainer,
  }
  const perPageOptions = [10, 20, 30, 50, 100]
  const isMyDeck = deckData?.userId === meData?.id

  const handleChangeCurrentPage = (value: number) => {
    setCurrentPage(value)
  }

  const handleChangeItemsPerPage = (value: number) => {
    setItemsPerPage(value)
  }

  const handleAddCard = (id: string, body: CreateCardArgs) => {
    createCard({ body, id })
  }

  const handleSortChange = (key: ColumnsSortable | null, direction: SortOrder) => {
    setSortBy({ direction, key })
  }

  const handleDeleteDeck = () => {
    deleteDeck({ id: deckId })

    navigate('/decks')
  }

  const handleEditDeck = (data: Omit<UpdateDecksArgs, 'id'>) => {
    updateDeck({ id: deckId, ...data })
  }

  return (
    <div>
      <Typography as={Link} className={classNames.linkBack} to={'/decks'} variant={'body2'}>
        <ArrowBackIcon />
        Back to Decks List
      </Typography>
      <div className={classNames.titleContainer}>
        <div className={classNames.title}>
          <Typography variant={'h1'}>{deckData?.name}</Typography>
          {isMyDeck && (
            <MenuBurger
              deckId={deckId}
              deckName={deckData?.name || ''}
              onDeleteDeck={handleDeleteDeck}
              onEditDeck={handleEditDeck}
            />
          )}
        </div>
        {isMyDeck ? (
          <AddCardModal handleDataConfirm={body => handleAddCard(deckId, body)} />
        ) : (
          <Button as={Link} to={`/decks/${deckId}/learn`}>
            Learn to Pack
          </Button>
        )}
      </div>
      {deckData?.cover && (
        <img alt={'deck image'} className={classNames.deckImage} src={deckData?.cover} />
      )}
      <Input
        className={classNames.searchInput}
        onValueChange={SetSearhQuestion}
        placeholder={'Input search'}
        search
      />
      {cards && <CardsTable cards={cards} isMyDeck={isMyDeck} onSortChange={handleSortChange} />}
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
