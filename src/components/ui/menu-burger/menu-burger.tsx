import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BurgerMenu } from '@/assets/icons/burger-menu'
import { Delete } from '@/assets/icons/delete'
import { Pen } from '@/assets/icons/pen'
import { Play } from '@/assets/icons/play'
import { DeckModal } from '@/components/decks/deck-modal'
import { DeleteDeckModule } from '@/components/decks/delete-deck-modal'
import { UpdateDecksArgs } from '@/services'

import s from './menu-burger.module.scss'

import { Button } from '../button'
import {
  Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { Typography } from '../typography'

type Props = {
  deckId: string
  deckName: string
  onDeleteDeck: (id: string) => void
  onEditDeck: (data: Omit<UpdateDecksArgs, 'id'>) => void
}

export const MenuBurger = ({ deckId, deckName, onDeleteDeck, onEditDeck }: Props) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true)
  }
  const handleOpenEditModal = () => {
    setIsOpenEditModal(true)
  }

  const handleDeckDelete = (id: string) => {
    onDeleteDeck(id)
  }
  const handleDeckEdit = (data: Omit<UpdateDecksArgs, 'id'>) => {
    onEditDeck(data)
  }

  return (
    <div>
      <Dropdown>
        <DropdownMenuTrigger className={s.trigger}>
          <BurgerMenu />
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'} className={s.content}>
          <DropdownMenuItem className={s.item}>
            <Button
              as={Link}
              className={s.playButton}
              to={`/decks/${deckId}/learn`}
              variant={'icon'}
            >
              <Play />
              <Typography variant={'caption'}>Learn</Typography>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={s.item} onSelect={handleOpenEditModal}>
            <Pen />
            <Typography variant={'caption'}> Edit</Typography>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={s.item} onSelect={handleOpenDeleteModal}>
            <Delete />
            <Typography variant={'caption'}>Delete</Typography>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </Dropdown>
      <DeckModal
        handleDataUpdate={handleDeckEdit}
        onOpenChange={setIsOpenEditModal}
        open={isOpenEditModal}
        title={'Edit Deck'}
      >
        Edit Deck
      </DeckModal>
      <DeleteDeckModule
        deckName={deckName}
        handleDeckDelete={handleDeckDelete}
        id={deckId}
        onOpenChange={setIsOpenDeleteModal}
        open={isOpenDeleteModal}
      >
        Delete Deck
      </DeleteDeckModule>
    </div>
  )
}
