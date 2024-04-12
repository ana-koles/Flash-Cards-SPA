import { Link } from 'react-router-dom'

import { BurgerMenu } from '@/assets/icons/burger-menu'
import { Delete } from '@/assets/icons/delete'
import { Pen } from '@/assets/icons/pen'
import { Play } from '@/assets/icons/play'

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
}

export const MenuBurger = ({ deckId }: Props) => {
  return (
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
          <DropdownMenuItem className={s.item}>
            <div>
              <Delete />
            </div>
            Delete
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </Dropdown>
  )
}
