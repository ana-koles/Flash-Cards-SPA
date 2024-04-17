import { Link } from 'react-router-dom'

import { ArrowAscIcon } from '@/assets/icons/arrow-asc/arrow-asc'
import { Delete } from '@/assets/icons/delete'
import { Pen } from '@/assets/icons/pen'
import { Play } from '@/assets/icons/play'
import {
  Button,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
  Typography,
} from '@/components'
import { Deck } from '@/services'
import { formatDate } from '@/utils'

import s from './decks-table.module.scss'
const columns: TableColumnNames[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'author.name',
    title: 'Created By',
  },
  {
    key: 'icons',
    title: '',
  },
]

export type TableColumnNames = {
  key: string
  title: string
}

export type Sort = {
  sortKey: null | string
  sortOrder: 'asc' | 'desc'
} | null

type Props = {
  authorUserId?: string
  decks: Deck[] | undefined
  onChangeSort: (key: string) => void
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
  sort: Sort
}

export const DecksTable = ({
  authorUserId,
  decks,
  onChangeSort,
  onDeleteClick,
  onEditClick,
  sort,
}: Props) => {
  const handleEditClick = (id: string) => () => onEditClick?.(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick?.(id)

  return (
    <TableWrapper>
      <TableHead>
        <TableHeadRow>
          {columns?.map(column => (
            <TableHeadCell key={column.key} onClick={() => onChangeSort(column.key)}>
              {column.title}
              {sort && sort.sortKey === column.key && (
                <span className={s.icon}>
                  {sort.sortOrder === 'asc' ? (
                    <ArrowAscIcon />
                  ) : (
                    <ArrowAscIcon className={s.descIcon} />
                  )}
                </span>
              )}
            </TableHeadCell>
          ))}
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {decks?.map(deck => (
          <TableBodyRow key={deck.id}>
            <TableBodyCell className={s.pack}>
              {deck.cover && <img alt={'cover'} className={s.cover} src={deck.cover} />}
              <Typography
                as={Link}
                className={s.name}
                to={`/decks/${deck?.id}/cards`}
                variant={'body2'}
              >
                {deck.name}
              </Typography>
            </TableBodyCell>
            <TableBodyCell>{deck.cardsCount}</TableBodyCell>
            <TableBodyCell>{formatDate(deck.updated)}</TableBodyCell>
            <TableBodyCell>{deck.author.name}</TableBodyCell>
            <TableBodyCell>
              <span className={s.icons}>
                <Button as={Link} to={`/decks/${deck?.id}/learn`} variant={'icon'}>
                  <Play />
                </Button>
                {deck.author.id === authorUserId && (
                  <>
                    <Button onClick={handleEditClick(deck?.id)} variant={'icon'}>
                      <Pen />
                    </Button>
                    <Button onClick={handleDeleteClick(deck?.id)} variant={'icon'}>
                      <Delete />
                    </Button>
                  </>
                )}
              </span>
            </TableBodyCell>
          </TableBodyRow>
        ))}
      </TableBody>
    </TableWrapper>
  )
}
