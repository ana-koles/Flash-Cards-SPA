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
}

type TableContentItem = Pick<Card, 'answer' | 'grade' | 'question' | 'updated'>

type TableColumnNameItem = {
  accessor: keyof TableContentItem
  sortable: boolean
  title: string
}

const tableColumnNames: TableColumnNameItem[] = [
  { accessor: 'question', sortable: true, title: 'Question' },
  { accessor: 'answer', sortable: true, title: 'Answer' },
  { accessor: 'updated', sortable: true, title: 'Last Updated' },
  { accessor: 'grade', sortable: true, title: 'Grade' },
]

export const CardsTable = ({ cards }: Props) => {
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
            </TableBodyRow>
          )
        })}
      </TableBody>
    </TableWrapper>
  )
}
