import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { ArrowAscIcon } from '@/assets/icons/arrowAsc'

import s from './tables.module.scss'

import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
} from './tables'

type TableContentItem = {
  cards: number
  createdBy: string
  icons: string
  name: string
  udpate: string
}

type TableColumnNameItem = {
  accessor: keyof TableContentItem
  sortable: boolean
  title: string
}

const tableColumnNames: TableColumnNameItem[] = [
  { accessor: 'name', sortable: true, title: 'Name' },
  { accessor: 'cards', sortable: true, title: 'Cards' },
  { accessor: 'udpate', sortable: true, title: 'Last Updated' },
  { accessor: 'createdBy', sortable: true, title: 'Created by' },
  { accessor: 'icons', sortable: false, title: '' },
]

const tableContent: TableContentItem[] = [
  { cards: 19, createdBy: 'Nick', icons: '*', name: 'JS', udpate: '22-01-2024' },
  { cards: 9, createdBy: 'Bob', icons: '?', name: 'React', udpate: '01-01-2024' },
  { cards: 20, createdBy: 'Lili', icons: '@', name: 'TS', udpate: '22-11-2023' },
]

const meta = {
  argTypes: {},
  component: TableWrapper,
  tags: ['autodocs'],
  title: 'Components/ Table',
} satisfies Meta<typeof TableWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const TableWithDefaultData1: Story = {
  args: {
    children: <></>,
  },
  render: () => {
    return (
      <TableWrapper>
        <TableHead>
          <TableHeadRow>
            <TableHeadCell>{tableColumnNames[0].title}</TableHeadCell>
            <TableHeadCell>{tableColumnNames[1].title}</TableHeadCell>
            <TableHeadCell>{tableColumnNames[2].title}</TableHeadCell>
            <TableHeadCell>{tableColumnNames[3].title}</TableHeadCell>
            <TableHeadCell>{tableColumnNames[4].title}</TableHeadCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          <TableBodyRow>
            <TableBodyCell>{tableContent[0].name}</TableBodyCell>
            <TableBodyCell>{tableContent[0].cards}</TableBodyCell>
            <TableBodyCell>{tableContent[0].udpate}</TableBodyCell>
            <TableBodyCell>{tableContent[0].createdBy}</TableBodyCell>
            <TableBodyCell>{tableContent[0].icons}</TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell>{tableContent[1].name}</TableBodyCell>
            <TableBodyCell>{tableContent[1].cards}</TableBodyCell>
            <TableBodyCell>{tableContent[1].udpate}</TableBodyCell>
            <TableBodyCell>{tableContent[1].createdBy}</TableBodyCell>
            <TableBodyCell>{tableContent[1].icons}</TableBodyCell>
          </TableBodyRow>
        </TableBody>
      </TableWrapper>
    )
  },
}

type SortOrder = 'asc' | 'desc'

export const TableWithMapAndSorting1: Story = {
  args: {
    children: <></>,
  },
  render: () => {
    const [sortField, setSortField] = useState<string>('') //по чем сортируем
    const [order, setOrder] = useState<SortOrder>('asc') // порядок сортировки
    const [dataToDisplay, setDataToDisplay] = useState(tableContent)

    const handleSorting = (sortField: keyof TableContentItem, sortOrder: SortOrder) => {
      if (!sortField) {
        return
      }

      const sorted = [...dataToDisplay].sort((a, b) => {
        const orderDirection = sortOrder === 'asc' ? 1 : -1

        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), undefined, {
            numeric: true,
          }) * orderDirection
        )
      })

      setDataToDisplay(sorted)
    }

    const handleSortingChange = (accessor: keyof TableContentItem, sortable: boolean) => {
      if (!sortable) {
        return
      }

      let sortOrder: SortOrder = 'asc'

      if (accessor === sortField) {
        sortOrder = order === 'asc' ? 'desc' : 'asc'
        setOrder(sortOrder)
      } else {
        setSortField(accessor)
        setOrder(sortOrder)
      }

      handleSorting(accessor, sortOrder)
    }

    return (
      <TableWrapper>
        <TableHead>
          <TableHeadRow>
            {tableColumnNames.map((column, index) => (
              <TableHeadCell
                key={`${column.accessor + index} `}
                onClick={() => handleSortingChange(column.accessor, column.sortable)}
              >
                {column.title}
                {column.accessor === sortField && (
                  <span>
                    {order === 'asc' ? <ArrowAscIcon /> : <ArrowAscIcon className={s.descIcon} />}
                  </span>
                )}
              </TableHeadCell>
            ))}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {dataToDisplay.map((card, index) => (
            <TableBodyRow key={`${'c' + index}`}>
              <TableBodyCell key={`${card.name + index}`}>{card.name}</TableBodyCell>
              <TableBodyCell key={`${card.cards + index}`}>{card.cards}</TableBodyCell>
              <TableBodyCell key={`${card.udpate + index}`}>{card.udpate}</TableBodyCell>
              <TableBodyCell key={`${card.createdBy + index}`}>{card.createdBy}</TableBodyCell>
              <TableBodyCell key={`${card.icons + index}`}>{card.icons}</TableBodyCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </TableWrapper>
    )
  },
}
