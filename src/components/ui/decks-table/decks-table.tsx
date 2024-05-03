import { Link } from 'react-router-dom'

import { ArrowAscIcon, Delete, Pen, Play } from '@/assets'
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
    key: '',
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

  const classNames = {
    bodyRow: s.bodyRow,
    cover: s.cover,
    iconsCell: s.iconsCell,
    name: s.name,
    pack: s.pack,
    sortable: s.sortable,
  }

  return (
    <TableWrapper className={s.decksTableWrapper}>
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
          <TableBodyRow className={classNames.bodyRow} key={deck.id}>
            <TableBodyCell className={classNames.pack}>
              {deck.cover && (
                <Link to={`/decks/${deck?.id}/cards`}>
                  <img alt={'cover'} className={classNames.cover} src={deck.cover} />
                </Link>
              )}
              <Typography
                as={Link}
                className={classNames.name}
                to={`/decks/${deck?.id}/cards`}
                variant={'body2'}
              >
                {deck.name}
              </Typography>
            </TableBodyCell>
            <TableBodyCell>{deck.cardsCount}</TableBodyCell>
            <TableBodyCell>{formatDate(deck.updated)}</TableBodyCell>
            <TableBodyCell>{deck.author.name}</TableBodyCell>
            <TableBodyCell className={classNames.iconsCell}>
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
