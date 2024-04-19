import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Delete } from '@/assets'
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
} from '@/components'
import { DeckModal, DeleteDeckModule } from '@/components/decks'
import { useDebounce } from '@/hooks/useDebounce'
import {
  UpdateDecksArgs,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} from '@/services'
import { useMeQuery } from '@/services/auth'

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
  const [deckIdToUpdate, setDeckIdToUpdate] = useState<null | string | undefined>(null)
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
  const handleDeckUpdate = (updatedData: UpdateDecksArgs) => {
    updateDeck({ ...updatedData })
  }

  const decksDataToUpdate = data?.items?.find(deck => deck.id === deckIdToUpdate)
  const openDeleteDeck = !!deckToDelete
  const handleDeckDelete = () => {
    deleteDeck({ id: deckToDelete || '' })
    setDeckToDelete(null)
  }

  const deckNameToDelete = data?.items?.find(deck => deck.id === deckToDelete)?.name || ''

  const handleDeckCreate = (data: { isPrivate: boolean; name: string }) => {
    setSearchParams({ currentPage: [] })
    createDeck({ ...data })
  }

  const handleClearFilters = () => {
    setSearchParams({})
  }
  const classNames = {
    pageTitle: s.pageTitle,
  }

  return (
    <div className={s.content}>
      <div className={s.head}>
        <Typography className={classNames.pageTitle} variant={'h1'}>
          Deck list
        </Typography>
        <Button onClick={handleOpenModal}>Add New Deck</Button>
        <DeckModal
          handleDataCreate={handleDeckCreate}
          onOpenChange={setOpenModal}
          open={openModal}
          title={'Add New Deck'}
        />
        <DeckModal
          deckToUpdate={decksDataToUpdate}
          handleDataUpdate={handleDeckUpdate}
          onOpenChange={() => setDeckIdToUpdate(null)}
          open={!!deckIdToUpdate}
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
        onEditClick={setDeckIdToUpdate}
        sort={sort}
      />
      <div className={s.paginationWrapper}>
        <Pagination
          currentPage={+currentPage ?? 1}
          itemsPerPage={+itemsPerPage}
          onPageChange={pageNumber => changeFiltersParam('currentPage', pageNumber + '')}
          totalItemsCount={data?.pagination.totalItems ?? 1}
        />
        <PerPageSelect
          itemsPerPage={+itemsPerPage ?? 10}
          onPerPageChange={value => changeFiltersParam('itemsPerPage', value + '')}
          perPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </div>
  )
}
