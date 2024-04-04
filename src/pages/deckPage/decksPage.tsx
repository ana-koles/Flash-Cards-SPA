import { useEffect, useState } from 'react'

import { Delete } from '@/assets/icons/delete'
import { AddDeckModal } from '@/components/decks/add-deck-modal'
import { DeleteDeckModule } from '@/components/decks/delete-deck-modal'
import { Button } from '@/components/ui/button'
import { DecksTable, Sort } from '@/components/ui/decksTable'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { TabList, TabRoot, TabTrigger } from '@/components/ui/tabs/tabs'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'

import s from './decksPage.module.scss'

export const DecksPage = () => {
  const [search, setSearch] = useState('')
  const [currentTab, setCurrentTab] = useState('allCards')
  const [minCardsCount, setMinCardsCount] = useState<number>()
  const [maxCardsCount, setMaxCardsCount] = useState<number>()
  const [cardsCount, setCardsCount] = useState([minCardsCount, maxCardsCount])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortKey, setSortKey] = useState<null | string>('')
  const [deckToUpdate, setDeckToUpdate] = useState<null | string>(null)
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
    authorId: currentTab === 'my' ? userId : undefined,
    currentPage: currentPage,
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
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
  }

  const sliderRangeValue = minMaxCards ? [minCardsCount, maxCardsCount] : undefined
  const handleRangeValueChange = (value: number[]) => {
    setMinCardsCount(value[0])
    setMaxCardsCount(value[1])
    setCardsCount(cardsCount)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  // const deckNameToUpdate = data?.items?.find(deck => deck.id === deckToUpdate)?.name || ''
  const openUpdateDeck = !!deckToUpdate
  const handleDeckUpdate = () => {
    updateDeck({ id: deckToUpdate || '' })
    setDeckToUpdate(null)
  }

  const deckNameToDelete = data?.items?.find(deck => deck.id === deckToDelete)?.name || ''
  const openDeleteDeck = !!deckToDelete
  const handleDeckDelete = () => {
    deleteDeck({ id: deckToDelete || '' })
    setDeckToDelete(null)
  }

  return (
    <div className={s.content}>
      <div className={s.head}>
        <Typography variant={'h1'}>Deck list</Typography>
        <Button onClick={handleOpenModal}>Add New Deck</Button>
        <AddDeckModal
          handleDataConfirm={data => createDeck(data)}
          onOpenChange={setOpenModal}
          open={openModal}
        />
        <AddDeckModal
          handleDataConfirm={handleDeckUpdate}
          onOpenChange={() => setDeckToUpdate(null)}
          open={openUpdateDeck}
        />
        <DeleteDeckModule
          deckName={deckNameToDelete}
          handleDeckDelete={handleDeckDelete}
          id={deckToDelete || ''}
          onOpenChange={() => setDeckToDelete(null)}
          open={openDeleteDeck}
        />
      </div>
      <div className={s.components}>
        <Input
          onValueChange={setSearch}
          placeholder={'Input search'}
          search
          type={'search'}
          value={search}
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
          value={sliderRangeValue}
        />
        <Button variant={'secondary'}>
          <Delete />
          Clear Filter
        </Button>
      </div>
      <DecksTable
        currentUserId={''}
        decks={data?.items}
        onChangeSort={handleSort}
        onDeleteClick={setDeckToDelete}
        // onEditClick={() => {
        //   updateDeck({ id: 'clu9rthny00ioys2fd5jejbz4', name: 'second name' })
        // }}
        onEditClick={setDeckToUpdate}
        sort={{ key: sortKey, sortOrder }}
      />
      <div>
        <Pagination
          currentPage={currentPage ?? 1}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          totalItemsCount={data?.pagination.totalItems || 1}
        />
      </div>
    </div>
  )
}
