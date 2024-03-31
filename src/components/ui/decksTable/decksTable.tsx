import { Delete } from '@/assets/icons/delete'
import { Pen } from '@/assets/icons/pen'
import { Play } from '@/assets/icons/play'
import { Button } from '@/components/ui/button'
import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'

type Deck = {
  cards: number
  createdBy: string
  id: string
  lastUpdated: string
  name: string
}
type Props = {
  decks: Deck[] | undefined
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
}
export const DecksTable = ({ decks, onDeleteClick, onEditClick }: Props) => {
  const handleEditClick = (id: string) => () => onEditClick?.(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick?.(id)

  return (
    <TableWrapper>
      <TableHead>
        <TableHeadRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Last updated</TableHeadCell>
          <TableHeadCell>Author</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {decks?.map(deck => (
          <TableBodyRow key={deck.id}>
            <TableBodyCell>
              <Typography as={'a'} href={`/decks/${deck.id}`} variant={'body2'}>
                {deck.name}
              </Typography>
            </TableBodyCell>
            <TableBodyCell>{deck.cards}</TableBodyCell>
            <TableBodyCell>{new Date(deck.lastUpdated).toLocaleString('ru-ru')}</TableBodyCell>
            <TableBodyCell>{deck.createdBy}</TableBodyCell>
            <TableBodyCell>
              <div>
                <Button
                  as={'a'}
                  href={`/decks/${deck.id}/learn`}
                  // variant={'link'}
                >
                  <Play />
                </Button>
                <div onClick={handleEditClick(deck.id)}>
                  <Pen />
                </div>
                <div onClick={handleDeleteClick(deck.id)}>
                  <Delete />
                </div>
              </div>
            </TableBodyCell>
          </TableBodyRow>
        ))}
      </TableBody>
    </TableWrapper>
  )
}
