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
import { Card } from '@/services'
import { formatDate } from '@/utils'

type Props = {
  cards: Card[]
  isMyDeck: boolean
}

type TableContentItem = 'abilityToEdit' | 'answer' | 'grade' | 'question' | 'updated'

type TableColumnNameItem = {
  accessor: TableContentItem
  sortable: boolean
  title: string
}

export const CardsTable = ({ cards, isMyDeck }: Props) => {
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
              <TableBodyCell>{card.grade}</TableBodyCell>
              {isMyDeck && (
                <TableBodyCell>
                  <Button variant={'icon'}>
                    <EditIcon />
                  </Button>
                  <Button variant={'icon'}>
                    <TrashIcon />
                  </Button>
                </TableBodyCell>
              )}
            </TableBodyRow>
          )
        })}
      </TableBody>
    </TableWrapper>
  )
}
