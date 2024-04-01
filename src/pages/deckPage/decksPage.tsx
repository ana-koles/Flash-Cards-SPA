import { useState } from 'react'

import { Delete } from '@/assets/icons/delete'
import { AddDeckModal } from '@/components/decks/add-deck-modal'
import { Button } from '@/components/ui/button'
import { DecksTable } from '@/components/ui/decksTable'
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
} from '@/services'

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
  // const [sort, setSort] = useState()

  const { data, error, isError, isLoading } = useGetDecksQuery({
    currentPage: currentPage,
    name: search,
  })
  const { data: minMaxCards } = useGetMinMaxCardsQuery()
  const [
    createDeck,
    // { isLoading: isDeckBeingCreated }
  ] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  console.log(search)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  const handleDeleteClick = (id: string) => {
    deleteDeck({ id })
  }
  // const handleCreateDeck = (name: string) => {
  //   createDeck({ name })
  // }
  // const handleEditClick = (id: string) => {
  //   updateDeck({ id: 'clu9rf6xk00hzys2fqelt7t8h', name: 'update deck' })
  // }
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

  console.log(data)

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
        // sort={sort}
        // setSort={}
        decks={data?.items.map(deck => ({
          cards: deck.cardsCount,
          createdBy: deck.author.name,
          id: deck.id,
          lastUpdated: deck.updated,
          name: deck.name,
        }))}
        onDeleteClick={handleDeleteClick}
        onEditClick={() => {
          updateDeck({ id: 'clu9rthny00ioys2fd5jejbz4', name: 'second name' })
        }}
      />
      <div>
        <Pagination
          currentPage={currentPage ?? 1}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          totalItemsCount={data?.pagination.totalItems || 1}
        />
      </div>
      <div className={s.test}>
        {/*<Button*/}
        {/*  disabled={isDeckBeingCreated}*/}
        {/*  onClick={() => {*/}
        {/*    createDeck({ name: 'new deck' })*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Create Deck*/}
        {/*</Button>*/}
      </div>
    </div>
  )
}
