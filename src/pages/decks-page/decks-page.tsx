import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Delete } from '@/assets/icons/delete'
import { DeckModal } from '@/components/decks/deck-modal'
import { DeleteDeckModule } from '@/components/decks/delete-deck-modal'
import {
  Button,
  DecksTable,
  Input,
  Pagination,
  PerPageSelect,
  Slider,
  TabList,
  TabRoot,
  TabTrigger,
  Typography,
} from '@/components/ui'
import { useDebounce } from '@/hooks/useDebounce'
import { useMeQuery } from '@/services/auth'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'

import s from './decks-page.module.scss'
export type fieldGetDecksArgs =
  | 'authorId'
  | 'currentPage'
  | 'currentTab'
  | 'itemsPerPage'
  | 'maxCardsCount'
  | 'minCardsCount'
  | 'name'
  | 'orderBy'
export const DecksPage = () => {
  const { data: minMaxCards } = useGetMinMaxCardsQuery()
  const [searchParams, setSearchParams] = useSearchParams({})
  const changeFiltersParam = (field: fieldGetDecksArgs, value: null | string) => {
    const search = Object.fromEntries(searchParams)

    if (field !== 'currentPage') {
      setSearchParams({ ...search, currentPage: [], [field]: value ?? [] })
    } else {
      setSearchParams({ ...search, [field]: value ?? [] })
    }
  }

  const searchName = searchParams.get('name') ?? ''
  const currentTab = searchParams.get('currentTab') ?? 'allCards'
  const minCardsCount = searchParams.get('minCardsCount') ?? '0'
  const maxCardsCount = searchParams.get('maxCardsCount') ?? minMaxCards?.max ?? ''
  const currentPage = searchParams.get('currentPage') ?? '1'
  const itemsPerPage = searchParams.get('itemsPerPage') ?? '10'
  const orderBy = searchParams.get('orderBy')

  const parsedOrderBy = (orderBy: null | string) => {
    if (!orderBy) {
      return null
    }
    const [sortKey, sortOrder] = orderBy.split('-') as [string, 'asc' | 'desc']

    return { sortKey, sortOrder }
  }

  const sort = parsedOrderBy(orderBy)

  const handleSort = (key: string) => {
    if (sort && sort.sortKey === key) {
      const newSortOrder = sort.sortOrder === 'asc' ? 'desc' : 'asc'

      changeFiltersParam('orderBy', `${key}-${newSortOrder}`)
    } else {
      changeFiltersParam('orderBy', `${key}-asc`)
    }
  }
  const [deckToUpdate, setDeckToUpdate] = useState<null | string>(null)
  const [openModal, setOpenModal] = useState(false)
  const [deckToDelete, setDeckToDelete] = useState<null | string>(null)
  const { data: authMe } = useMeQuery()
  const userId = authMe?.id
  const debounceSearch = useDebounce(searchName, 500)
  const { data, error, isError, isLoading } = useGetDecksQuery({
    authorId: currentTab === 'myCards' ? userId : undefined,
    currentPage: +currentPage,
    itemsPerPage: +itemsPerPage,
    maxCardsCount: +maxCardsCount ?? undefined,
    minCardsCount: +minCardsCount ?? undefined,

    name: debounceSearch ?? '',
    orderBy: orderBy ?? undefined,
  })

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  if (isLoading) {
    return <span className={s.loader}></span>
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  const setCardsCount = (value: number[]) => {
    const search = Object.fromEntries(searchParams)

    setSearchParams({
      ...search,
      currentPage: [],
      maxCardsCount: value[1].toString(),
      minCardsCount: value[0].toString(),
    })
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const deckNameToUpdate = data?.items?.find(deck => deck.id === deckToUpdate)
  const openUpdateDeck = !!deckToUpdate
  const handleDeckUpdate = (data: { isPrivate: boolean; name: string }) => {
    if (deckToUpdate) {
      updateDeck({ id: deckToUpdate, ...data })
    }
  }

  const deckNameToDelete = data?.items?.find(deck => deck.id === deckToDelete)?.name || ''
  const openDeleteDeck = !!deckToDelete
  const handleDeckDelete = () => {
    deleteDeck({ id: deckToDelete || '' })
    setDeckToDelete(null)
  }

  const handleCreateDeck = (data: { isPrivate: boolean; name: string }) => {
    createDeck({ ...data })
  }

  const handleClearFilters = () => {
    setSearchParams({})
  }

  return (
    <div className={s.content}>
      <div className={s.head}>
        <Typography variant={'h1'}>Deck list</Typography>
        <Button onClick={handleOpenModal}>Add New Deck</Button>
        <DeckModal
          handleDataCreate={handleCreateDeck}
          // handleDataConfirm={handleCreateDeck}
          onOpenChange={setOpenModal}
          open={openModal}
          title={'Add New Deck'}
        />
        <DeckModal
          defaultValues={deckNameToUpdate}
          handleDataUpdate={handleDeckUpdate}
          // handleDataConfirm={handleDeckUpdate}
          key={deckToUpdate}
          onOpenChange={() => setDeckToUpdate(null)}
          open={openUpdateDeck}
          title={'Update Deck'}
        />
        <DeleteDeckModule
          deckName={deckNameToDelete}
          handleDeckDelete={handleDeckDelete}
          id={deckToDelete ?? ''}
          onOpenChange={() => setDeckToDelete(null)}
          open={openDeleteDeck}
        />
      </div>
      <div className={s.components}>
        <Input
          onValueChange={value => changeFiltersParam('name', value)}
          placeholder={'Input search'}
          search
          type={'search'}
          value={searchName}
        />
        <TabRoot
          label={'Show decks cards'}
          onValueChange={tab => changeFiltersParam('currentTab', tab)}
          value={currentTab}
        >
          <TabList>
            <TabTrigger value={'myCards'}>My Cards</TabTrigger>
            <TabTrigger value={'allCards'}>All Cards</TabTrigger>
          </TabList>
        </TabRoot>
        <Slider
          label={'Number of cards'}
          max={minMaxCards?.max}
          min={0}
          onValueChange={setCardsCount}
          value={[+minCardsCount, +maxCardsCount]}
        />
        <Button onClick={handleClearFilters} variant={'secondary'}>
          <Delete />
          Clear Filter
        </Button>
      </div>
      <DecksTable
        authorUserId={userId}
        decks={data?.items}
        onChangeSort={handleSort}
        onDeleteClick={setDeckToDelete}
        onEditClick={setDeckToUpdate}
        sort={sort}
      />
      <div className={s.pagination}>
        <span>
          <Pagination
            currentPage={+currentPage ?? 1}
            itemsPerPage={+itemsPerPage}
            onPageChange={pageNumber => changeFiltersParam('currentPage', pageNumber + '')}
            totalItemsCount={data?.pagination.totalItems ?? 1}
          />
        </span>
        <span className={s.select}>
          <PerPageSelect
            itemsPerPage={+itemsPerPage ?? 10}
            onPerPageChange={value => changeFiltersParam('itemsPerPage', value + '')}
            perPageOptions={[5, 10, 15, 20]}
          />
        </span>
      </div>
    </div>
  )
}
