import { useState } from 'react'

import { EditIcon, TrashIcon } from '@/assets/icons'
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
import { Grade } from '@/components/ui/tables'
import { Card, useDeleteCardMutation } from '@/services'
import { formatDate } from '@/utils'

import { DeleteCardModule } from '../cards/delete-card-modal'

type Props = {
  cards: Card[] | undefined
  isMyDeck: boolean
  onEditClick: (id: string) => void
}

type TableContentItem = 'abilityToEdit' | 'answer' | 'grade' | 'question' | 'updated'

type TableColumnNameItem = {
  accessor: TableContentItem
  sortable: boolean
  title: string
}

export const CardsTable = ({ cards, isMyDeck, onEditClick }: Props) => {
  const [openCardId, setOpenCardId] = useState<boolean | null | string>(null)
  const [deleteCard, {}] = useDeleteCardMutation()
  let tableColumnNames: TableColumnNameItem[] = [
    { accessor: 'question', sortable: true, title: 'Question' },
    { accessor: 'answer', sortable: true, title: 'Answer' },
    { accessor: 'updated', sortable: true, title: 'Last Updated' },
    { accessor: 'grade', sortable: true, title: 'Grade' },
  ]

  if (isMyDeck) {
    tableColumnNames = [
      ...tableColumnNames,
      { accessor: 'abilityToEdit', sortable: false, title: '' },
    ]
  }

  const handleEditClick = (id: string) => () => onEditClick(id)

  const handleOpenChange = (id: string) => () => {
    setOpenCardId(id)
  }

  const handleCardDelete = (id: string) => {
    deleteCard({ id })
  }

  return (
    <TableWrapper>
      <TableHead>
        <TableHeadRow>
          {tableColumnNames.map((column, index) => {
            return <TableHeadCell key={`${column.accessor + index}`}>{column.title}</TableHeadCell>
          })}
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {cards?.map(card => {
          return (
            <TableBodyRow key={card.id}>
              <TableBodyCell>{card.question}</TableBodyCell>
              <TableBodyCell>{card.answer}</TableBodyCell>
              <TableBodyCell>{formatDate(card.updated)}</TableBodyCell>
              <TableBodyCell>
                <Grade maxGrade={5} onClick={() => {}} value={card.grade} />
              </TableBodyCell>
              {isMyDeck && (
                <TableBodyCell>
                  <Button onClick={handleEditClick(card.id)} variant={'icon'}>
                    <EditIcon />
                  </Button>
                  <Button onClick={handleOpenChange(card.id)} variant={'icon'}>
                    <TrashIcon />
                  </Button>
                  <DeleteCardModule
                    card={{ id: card.id, name: card.question }}
                    handleCardDelete={handleCardDelete}
                    onOpenChange={setOpenCardId}
                    open={card.id === openCardId}
                  >
                    Delete Card
                  </DeleteCardModule>
                </TableBodyCell>
              )}
            </TableBodyRow>
          )
        })}
      </TableBody>
    </TableWrapper>
  )
}
