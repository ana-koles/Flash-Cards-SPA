import { ArrowAscIcon } from '@/assets/icons/arrowAsc/arrowAsc'
import { Delete } from '@/assets/icons/delete'
import { Pen } from '@/assets/icons/pen'
import { Play } from '@/assets/icons/play'
import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
} from '@/components/ui/table'
import { Deck } from '@/services'
import { formatDate } from '@/utils'

import s from './decksTable.module.scss'
const tableColumnNames: TableColumnNames[] = [
  {
    column: 'name',
    sortable: true,
    title: 'Name',
  },
  {
    column: 'cardsCount',
    sortable: true,
    title: 'Cards',
  },
  {
    column: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    column: 'created',
    sortable: true,
    title: 'Created By',
  },
  {
    column: 'icons',
    sortable: false,
    title: '',
  },
]

export type TableColumnNames = {
  column: string
  sortable?: boolean
  title: string
}

export type Sort = {
  key: null | string
  sortOrder: 'asc' | 'desc'
} | null

type Props = {
  currentUserId?: string
  decks: Deck[] | undefined
  onChangeSort: (key: Sort) => void
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
  sort: Sort
}

export const DecksTable = ({ decks, onChangeSort, onDeleteClick, onEditClick, sort }: Props) => {
  const handleEditClick = (id: string) => () => onEditClick?.(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick?.(id)
  const handleSortingChange = (column: string, sortable?: boolean) => () => {
    if (!sortable) {
      return
    }
    let newSort: Sort

    if (sort && sort?.key === column) {
      const newSortOrder = sort.sortOrder === 'asc' ? 'desc' : 'asc'

      newSort = { key: column, sortOrder: newSortOrder }
    } else {
      newSort = { key: column, sortOrder: 'asc' }
    }

    onChangeSort(newSort)
  }

  return (
    <TableWrapper>
      <TableHead>
        <TableHeadRow>
          {tableColumnNames?.map(({ column, sortable, title }) => (
            <TableHeadCell key={column} onClick={handleSortingChange(column, sortable)}>
              {title}
              {sort && sort.key === column && (
                <span>
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
            <TableBodyCell>{deck.name}</TableBodyCell>
            <TableBodyCell>{deck.cardsCount}</TableBodyCell>
            <TableBodyCell>{formatDate(deck.updated)}</TableBodyCell>
            <TableBodyCell>{deck.author.name}</TableBodyCell>
            <TableBodyCell>
              <span>
                <link href={`/decks/${deck?.id}/learn`} />
                <Play />
                <span onClick={handleEditClick(deck?.id)}>
                  <Pen />
                </span>
                <span onClick={handleDeleteClick(deck?.id)}>
                  <Delete />
                </span>
              </span>
            </TableBodyCell>
          </TableBodyRow>
        ))}
      </TableBody>
    </TableWrapper>
  )
}
