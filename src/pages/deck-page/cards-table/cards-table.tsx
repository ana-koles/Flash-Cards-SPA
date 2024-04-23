import { ArrowAscIcon } from '@/assets'
import {
  DeleteCardModal,
  EditCardModal,
  Grade,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
  Typography,
} from '@/components'
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
    cover: s.cover,
    sortable: s.sortable,
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
    <TableWrapper className={s.cardsTableWrapper}>
      <TableHead>
        <TableHeadRow>
          {columns.map(column => {
            return (
              <TableHeadCell
                className={column.sortable ? classNames.sortable : ''}
                key={column.accessor}
                onClick={handleSortChange(column.accessor)}
              >
                {column.title}
                {column.sortable && column.accessor === sortColumn && (
                  <span className={s.icon}>
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
              <TableBodyCell className={s.cardBodyCell}>
                {card.questionImg && (
                  <img alt={'question image'} className={classNames.cover} src={card.questionImg} />
                )}
                {card.question && <Typography variant={'body2'}>{card.question}</Typography>}
              </TableBodyCell>
              <TableBodyCell className={s.cardBodyCell}>
                {card.answerImg && (
                  <img alt={'answer image'} className={classNames.cover} src={card.answerImg} />
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
                    <EditCardModal
                      card={card}
                      handleDataConfirm={body => handleEditCard(card.id, body)}
                    />
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
