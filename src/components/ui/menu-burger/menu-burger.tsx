import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BurgerMenu } from '@/assets/icons/burger-menu'
import { Delete } from '@/assets/icons/delete'
import { Pen } from '@/assets/icons/pen'
import { Play } from '@/assets/icons/play'
import { DeleteDeckModule } from '@/components/decks/delete-deck-modal'

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
}

export const MenuBurger = ({ deckId, deckName, onDeleteDeck }: Props) => {
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false)

  const handleOpenDeleteModal = () => {
    setisOpenDeleteModal(true)
  }

  const handleDeckDelete = (id: string) => {
    onDeleteDeck(id)
  }

  return (
    <div>
      <Dropdown>
        <DropdownMenuTrigger className={s.trigger}>
          <div className={s.burger}>
            <BurgerMenu />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'} className={s.content}>
          <div className={s.itemsBox}>
            <DropdownMenuItem className={s.item}>
              <Button as={Link} to={`/decks/${deckId}/learn`} variant={'icon'}>
                <Play />
                <Typography variant={'caption'}>Learn</Typography>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={s.item}>
              <div>
                <Pen />
              </div>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={s.item} onSelect={handleOpenDeleteModal}>
              <Delete />
              <Typography variant={'caption'}>Delete</Typography>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </Dropdown>
      <DeleteDeckModule
        deckName={deckName}
        handleDeckDelete={handleDeckDelete}
        id={deckId}
        onOpenChange={setisOpenDeleteModal}
        open={isOpenDeleteModal}
      >
        Delete Deck
      </DeleteDeckModule>
    </div>
  )
}
