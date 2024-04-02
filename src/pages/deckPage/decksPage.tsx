import { useState } from 'react'

import { Delete } from '@/assets/icons/delete'
import { AddDeckModal } from '@/components/decks/add-deck-modal'
import { Button } from '@/components/ui/button'
import { DecksTable, Sort } from '@/components/ui/decksTable'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { TabList, TabRoot, TabTrigger } from '@/components/ui/tabs/tabs'
import { Typography } from '@/components/ui/typography'
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
  const [currentTab, setCurrentTab] = useState('')
  const [minCardsCount, setMinCardsCount] = useState<number>()
  const [maxCardsCount, setMaxCardsCount] = useState<number>()
  const [range, setRange] = useState<(number | undefined)[]>([minCardsCount, maxCardsCount])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState(false)
  const [cardsCount, setCardsCount] = useState([minCardsCount, maxCardsCount])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortKey, setSortKey] = useState<null | string>('')

  const handleSort = (key: Sort) => {
    if (key && sortKey === key.key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key ? key.key : null)
      setSortOrder('asc')
    }
  }

  const { data, error, isError, isLoading } = useGetDecksQuery({
    currentPage: currentPage,
    name: search,
    orderBy: sortKey ? `${sortKey}-${sortOrder}` : undefined,
  })
  const { data: minMaxCards } = useGetMinMaxCardsQuery()
  const [
    createDeck,
    // { isLoading: isDeckBeingCreated }
  ] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  const handleDeleteClick = (id: string) => {
    deleteDeck({ id })
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
  }

  const handleRangeChange = (value: number[]) => {
    setMinCardsCount(value[0])
    setMaxCardsCount(value[1])
    setCardsCount(cardsCount)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
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
      </div>
      <div className={s.components}>
        <Input
          onValueChange={setSearch}
          placeholder={'Input search'}
          search
          type={'search'}
          value={search}
        />
        <TabRoot onValueChange={handleTabChange} value={currentTab}>
          <TabList>
            <TabTrigger value={'myCards'}>My Cards</TabTrigger>
            <TabTrigger value={'allCards'}>All Cards</TabTrigger>
          </TabList>
        </TabRoot>
        <Slider
          defaultValue={[0, maxCardsCount || 0]}
          max={minMaxCards?.max}
          min={0}
          onValueChange={setRange}
          onValueCommit={handleRangeChange}
          value={range}
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
        onDeleteClick={handleDeleteClick}
        onEditClick={() => {
          updateDeck({ id: 'clu9rthny00ioys2fd5jejbz4', name: 'second name' })
        }}
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
