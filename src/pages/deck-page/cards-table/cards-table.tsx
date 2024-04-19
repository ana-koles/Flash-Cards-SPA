import { ArrowAscIcon } from '@/assets/icons/arrow-asc'
import { EditCardModal } from '@/components/decks'
import { DeleteCardModal } from '@/components/decks/cards/delete-card-modal'
import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
} from '@/components/ui/table'
import { Grade } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import {
  BodyUpdateCard,
  CardResponse,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '@/services'
import { formatDate } from '@/utils'

import s from './cards-table.module.scss'

type Props = {
  cards: CardResponse[]
  isMyDeck: boolean
  onSortChange: (column: Omit<TableContentItem, 'abilityToEdit'> | null, order: SortOrder) => void
  sortColumn: string
  sortOrder: string
}

type TableContentItem = 'abilityToEdit' | 'answer' | 'grade' | 'question' | 'updated'
export type ColumnsSortable = Omit<TableContentItem, 'abilityToEdit'>
export type SortOrder = 'asc' | 'desc'

type TableColumnNameItem = {
  accessor: TableContentItem
  sortable: boolean
  title: string
}

export const CardsTable = ({ cards, isMyDeck, onSortChange, sortColumn, sortOrder }: Props) => {
  const [deleteCard, {}] = useDeleteCardMutation()
  const [updateCard, {}] = useUpdateCardMutation()

  const classNames = {
    buttonsWrapper: s.buttonsWrapper,
    image: s.image,
  }

  const columns: TableColumnNameItem[] = [
    { accessor: 'question', sortable: true, title: 'Question' },
    { accessor: 'answer', sortable: true, title: 'Answer' },
    { accessor: 'updated', sortable: true, title: 'Last Updated' },
    { accessor: 'grade', sortable: true, title: 'Grade' },
  ]

  if (isMyDeck) {
    columns.push({ accessor: 'abilityToEdit', sortable: false, title: '' })
  }

  const handleCardDelete = (id: string) => () => {
    deleteCard({ id })
  }

  const handleEditCard = (id: string, body: BodyUpdateCard) => {
    updateCard({ body, id })
  }

  const handleSortChange = (field: ColumnsSortable) => () => {
    let newSortOrder: SortOrder = 'asc'

    if (field === sortColumn) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    }
    onSortChange(field, newSortOrder)
  }

  return (
    <TableWrapper>
      <TableHead>
        <TableHeadRow>
          {columns.map(column => {
            return (
              <TableHeadCell key={column.accessor} onClick={handleSortChange(column.accessor)}>
                {column.title}
                {column.accessor === sortColumn && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <ArrowAscIcon />
                    ) : (
                      <ArrowAscIcon className={s.descIcon} />
                    )}
                  </span>
                )}
              </TableHeadCell>
            )
          })}
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {cards?.map(card => {
          return (
            <TableBodyRow key={card.id}>
              <TableBodyCell>
                {card.questionImg && (
                  <img alt={'question image'} className={classNames.image} src={card.questionImg} />
                )}
                {card.question && <Typography variant={'body2'}>{card.question}</Typography>}
              </TableBodyCell>
              <TableBodyCell>
                {card.answerImg && (
                  <img alt={'answer image'} className={classNames.image} src={card.answerImg} />
                )}
                {card.answer && <Typography variant={'body2'}>{card.answer}</Typography>}
              </TableBodyCell>
              <TableBodyCell>{formatDate(card.updated)}</TableBodyCell>
              <TableBodyCell>
                <Grade maxGrade={5} value={card.grade} />
              </TableBodyCell>
              {isMyDeck && (
                <TableBodyCell>
                  <div className={classNames.buttonsWrapper}>
                    <EditCardModal handleDataConfirm={body => handleEditCard(card.id, body)} />
                    <DeleteCardModal
                      card={{ id: card.id, name: card.question }}
                      onDeleteCard={handleCardDelete(card.id)}
                    />
                  </div>
                </TableBodyCell>
              )}
            </TableBodyRow>
          )
        })}
      </TableBody>
    </TableWrapper>
  )
}
