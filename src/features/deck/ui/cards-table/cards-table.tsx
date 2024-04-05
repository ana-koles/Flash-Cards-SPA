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
import { Typography } from '@/components/ui/typography'
import { Card, useDeleteCardMutation, useUpdateGradeMutation } from '@/services'
import { formatDate } from '@/utils'

import s from './cards-table.module.scss'

import { DeleteCardModule } from '../../../../components/decks/cards/delete-card-modal'

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
  const [updateGrade, {}] = useUpdateGradeMutation()

  const classNames = {
    buttonsWrapper: s.buttonsWrapper,
    image: s.image,
  }

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

  const handleChangeGrade = (cardId: string, grade: number) => {
    updateGrade({ cardId, grade })
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
                <Grade
                  maxGrade={5}
                  onClick={value => handleChangeGrade(card.id, value)}
                  value={card.grade}
                />
              </TableBodyCell>
              {isMyDeck && (
                <TableBodyCell>
                  <div className={classNames.buttonsWrapper}>
                    <Button onClick={handleEditClick(card.id)} variant={'icon'}>
                      <EditIcon />
                    </Button>
                    <Button onClick={handleOpenChange(card.id)} variant={'icon'}>
                      <TrashIcon />
                    </Button>
                  </div>
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
