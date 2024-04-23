import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { ArrowBackIcon } from '@/assets'
import { AddCardModal, Button, Input, MenuBurger, Pagination, Typography } from '@/components'
import { useDebounce } from '@/hooks/useDebounce'
import {
  CreateCardArgs,
  UpdateDecksArgs,
  useCreateCardMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetPaginatedCardsInDeckQuery,
  useMeQuery,
  useUpdateDeckMutation,
} from '@/services'

import s from './deck-page.module.scss'

import { CardsTable, ColumnsSortable, SortOrder } from './cards-table'
import { EmptyDeck } from './empty-deck'

export const DeckPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuestion = searchParams.get('searchQuestion') || ''
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 10
  const [keySort, direction] = (searchParams.get('sortBy') || 'null-null').split('-')
  const orderBy = keySort !== 'null' && `${keySort}-${direction}`
  const searchQuestionDebounce = useDebounce(searchQuestion, 500)

  const navigate = useNavigate()
  const { deckId = '' } = useParams()
  const { data: cardsData } = useGetPaginatedCardsInDeckQuery({
    id: deckId,
    params: {
      currentPage,
      itemsPerPage,
      orderBy: orderBy ? orderBy : undefined,
      question: searchQuestionDebounce,
    },
  })
  const [createCard, {}] = useCreateCardMutation()
  const { data: deckData } = useGetDeckQuery({ id: deckId })
  const { data: meData } = useMeQuery()
  const [deleteDeck, {}] = useDeleteDeckMutation()
  const [updateDeck, {}] = useUpdateDeckMutation()

  const cards = cardsData?.items
  const totalItemsCount = cardsData?.pagination.totalItems || 0
  const perPageOptions = [10, 20, 30, 50, 100]
  const isMyDeck = deckData?.userId === meData?.id

  const classNames = {
    content: s.content,
    deckImage: s.deckImage,
    linkBack: s.linkBack,
    pagination: s.pagination,
    searchInput: s.searchInput,
    title: s.title,
    titleContainer: s.titleContainer,
  }

  const handleChangeCurrentPage = (value: number) => {
    searchParams.set('currentPage', String(value))
    setSearchParams(searchParams)
  }

  const handleChangeItemsPerPage = (value: number) => {
    searchParams.set('currentPage', '1')
    searchParams.set('itemsPerPage', String(value))
    setSearchParams(searchParams)
  }

  const handleAddCard = (id: string, body: CreateCardArgs) => {
    createCard({ body, id })
  }

  const handleSortChange = (key: ColumnsSortable | null, direction: SortOrder) => {
    searchParams.set('sortBy', `${key}-${direction}`)
    setSearchParams(searchParams)
  }

  const handleDeleteDeck = () => {
    deleteDeck({ id: deckId })

    navigate('/decks')
  }

  const handleEditDeck = (data: Omit<UpdateDecksArgs, 'id'>) => {
    updateDeck({ id: deckId, ...data })
  }

  const handleClear = () => {
    searchParams.delete('searchQuestion')
    setSearchParams(searchParams)
  }

  const handleSearchQuestionChange = (value: string) => {
    searchParams.set('searchQuestion', value)
    setSearchParams(searchParams)
  }

  if (deckData?.cardsCount === 0 && isMyDeck) {
    return <EmptyDeck deck={deckData} />
  }

  return (
    <div className={classNames.content}>
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
        onClear={handleClear}
        onValueChange={handleSearchQuestionChange}
        placeholder={'Enter name'}
        search
        value={searchQuestion}
      />
      {cards && (
        <CardsTable
          cards={cards}
          isMyDeck={isMyDeck}
          onSortChange={handleSortChange}
          sortColumn={keySort}
          sortOrder={direction}
        />
      )}
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
