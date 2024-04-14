import { useEffect, useState } from 'react'

import { Delete } from '@/assets/icons/delete'
import { DeckModal } from '@/components/decks/deck-modal'
import { DeleteDeckModule } from '@/components/decks/delete-deck-modal'
import { Button } from '@/components/ui/button'
import { DecksTable, Sort } from '@/components/ui/decks-table'
import { Input } from '@/components/ui/input'
import { Pagination, PerPageSelect } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { TabList, TabRoot, TabTrigger } from '@/components/ui/tabs/tabs'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services'
import { useMeQuery } from '@/services/auth'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'

import s from './decks-page.module.scss'

export const DecksPage = () => {
  const [search, setSearch] = useState('')
  const [currentTab, setCurrentTab] = useState('allCards')
  const [minCardsCount, setMinCardsCount] = useState<number>()
  const [maxCardsCount, setMaxCardsCount] = useState<number>()
  const [cardsCount, setCardsCount] = useState([minCardsCount, maxCardsCount])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [openModal, setOpenModal] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortKey, setSortKey] = useState<null | string>('')
  const [deckIdToUpdate, setDeckIdToUpdate] = useState<null | string | undefined>(null)
  const { data: authMe } = useMeQuery()
  const handleSort = (key: Sort) => {
    if (key && sortKey === key.key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key ? key.key : null)
      setSortOrder('asc')
    }
  }
  const [deckToDelete, setDeckToDelete] = useState<null | string>(null)
  const userId = authMe?.id
  const { data, error, isError, isLoading } = useGetDecksQuery({
    authorId: currentTab === 'myCards' ? userId : undefined,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount,
    minCardsCount,
    name: search,
    orderBy: sortKey ? `${sortKey}-${sortOrder}` : undefined,
  })
  const { data: minMaxCards } = useGetMinMaxCardsQuery()

  useEffect(() => {
    setMinCardsCount(minMaxCards?.min)
    setMaxCardsCount(minMaxCards?.max)
  }, [minMaxCards])
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  if (isLoading) {
    return <span className={s.loader}></span>
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
  }

  const handleRangeValueChange = (value: number[]) => {
    setMinCardsCount(value[0])
    setMaxCardsCount(value[1])
    setCardsCount(cardsCount)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const decksDataToUpdate = data?.items?.find(deck => deck.id === deckIdToUpdate)

  console.log('decksDataToUpdate', decksDataToUpdate)
  const openUpdateDeck = !!deckIdToUpdate
  const handleDeckUpdate = (data: { isPrivate: boolean; name: string }) => {
    if (deckIdToUpdate) {
      updateDeck({ id: deckIdToUpdate, ...data })
    }
  }

  const deckNameToDelete = data?.items?.find(deck => deck.id === deckToDelete)?.name || ''
  const openDeleteDeck = !!deckToDelete
  const handleDeckDelete = () => {
    deleteDeck({ id: deckToDelete || '' })
    setDeckToDelete(null)
  }
  const handleChangePerPage = (value: number) => {
    setCurrentPage(1)
    setItemsPerPage(value)
  }
  const handleCreateDeck = (data: { isPrivate: boolean; name: string }) => {
    setCurrentPage(1)
    createDeck({ ...data })
  }
  const handleClearFilters = () => {
    setSearch('')
    setCurrentTab('allCards')
    setMinCardsCount(0)
    setMaxCardsCount(minMaxCards?.max)
    setCardsCount([0, maxCardsCount])
    setCurrentPage(1)
    handleSort(null)
    setItemsPerPage(10)
  }
  const handleSetSearch = (name: string) => {
    setSearch(name)
  }

  return (
    <div className={s.content}>
      <div className={s.head}>
        <Typography variant={'h1'}>Deck list</Typography>
        <Button onClick={handleOpenModal}>Add New Deck</Button>
        <DeckModal
          handleDataConfirm={handleCreateDeck}
          onOpenChange={setOpenModal}
          open={openModal}
          title={'Add New Deck'}
        />
        <DeckModal
          deckToUpdate={decksDataToUpdate}
          handleDataConfirm={handleDeckUpdate}
          onOpenChange={() => setDeckIdToUpdate(null)}
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
          onValueChange={handleSetSearch}
          placeholder={'Input search'}
          search
          type={'search'}
          value={search ?? ''}
        />
        <TabRoot label={'Show decks cards'} onValueChange={handleTabChange} value={currentTab}>
          <TabList>
            <TabTrigger value={'myCards'}>My Cards</TabTrigger>
            <TabTrigger value={'allCards'}>All Cards</TabTrigger>
          </TabList>
        </TabRoot>
        <Slider
          label={'Number of cards'}
          max={minMaxCards?.max}
          min={0}
          onValueChange={handleRangeValueChange}
          title={'Number of cards'}
          value={[minCardsCount, maxCardsCount]}
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
        sort={{ key: sortKey, sortOrder }}
      />
      <div className={s.pagination}>
        <span>
          <Pagination
            currentPage={currentPage ?? 1}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            totalItemsCount={data?.pagination.totalItems ?? 1}
          />
        </span>
        <span className={s.select}>
          <PerPageSelect
            itemsPerPage={itemsPerPage}
            onPerPageChange={handleChangePerPage}
            perPageOptions={[5, 10, 15, 20]}
          />
        </span>
      </div>
    </div>
  )
}
