import { Link } from 'react-router-dom'

import { BurgerMenu, Delete, Pen, Play } from '@/assets'
import {
  Button,
  Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
} from '@/components'

import s from './menu-burger.module.scss'

type Props = {
  deckId: string
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
}

export const MenuBurger = ({ deckId, onDeleteClick, onEditClick }: Props) => {
  const handleDeleteClick = (id: string) => () => onDeleteClick?.(id)
  const handleEditClick = (id: string) => () => onEditClick?.(id)

  return (
    <div>
      <Dropdown modal={false}>
        <DropdownMenuTrigger className={s.trigger}>
          <BurgerMenu />
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'} className={s.content}>
          <div className={s.itemsBox}>
            <DropdownMenuItem className={s.item}>
              <Play />
              <Button
                as={Link}
                className={s.playButton}
                to={`/decks/${deckId}/learn`}
                variant={'icon'}
              >
                <Typography variant={'caption'}>Learn</Typography>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={s.item} onSelect={handleEditClick(deckId)}>
              <Pen />
              <Typography variant={'caption'}> Edit</Typography>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={s.item} onSelect={handleDeleteClick(deckId)}>
              <Delete />
              <Typography variant={'caption'}>Delete</Typography>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </Dropdown>
    </div>
  )
}
