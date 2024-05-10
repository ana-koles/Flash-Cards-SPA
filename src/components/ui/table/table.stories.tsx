import type { Meta, StoryObj } from '@storybook/react'

import { ReactNode } from 'react'

import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
} from './table'

type TableContentItem = {
  cards: number
  createdBy: string
  icons: ReactNode
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

type Props = {
  clickHandler: (id: string) => void
}

const IconComponent1 = (props: Props) => {
  return <button onClick={() => props.clickHandler('5')}>Click Me</button>
}

const clickHandler = (id: string) => {
  console.log(id)
}

const tableContent: TableContentItem[] = [
  {
    cards: 19,
    createdBy: 'Nick',
    icons: <IconComponent1 clickHandler={clickHandler} />,
    name: 'Nick',
    udpate: '22-01-2024',
  },
  {
    cards: 9,
    createdBy: 'Bob',
    icons: <IconComponent1 clickHandler={clickHandler} />,
    name: 'Bob',
    udpate: '01-01-2024',
  },
  {
    cards: 20,
    createdBy: 'Lili',
    icons: <IconComponent1 clickHandler={clickHandler} />,
    name: 'Lili',
    udpate: '22-11-2023',
  },
]

const meta = {
  argTypes: {},
  component: TableWrapper,
  tags: ['autodocs'],
  title: 'Components/ Table',
} satisfies Meta<typeof TableWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultTable: Story = {
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

export const TableWithSortingAndMap: Story = {
  args: {
    children: <></>,
  },
  render: () => {
    return (
      <TableWrapper>
        <TableHead>
          <TableHeadRow>
            {tableColumnNames.map((column, index) => (
              <TableHeadCell key={`${column.accessor + index} `}>{column.title}</TableHeadCell>
            ))}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {tableContent.map((card, index) => (
            <TableBodyRow key={`${'c' + index}`}>
              <TableBodyCell key={`${card.name + index}`}>{card.name}</TableBodyCell>
              <TableBodyCell key={`${card.cards + index}`}>{card.cards}</TableBodyCell>
              <TableBodyCell key={`${card.udpate + index}`}>{card.udpate}</TableBodyCell>
              <TableBodyCell key={`${card.createdBy + index}`}>{card.createdBy}</TableBodyCell>
              <TableBodyCell key={`${index + 'icon'}`}>{card.icons}</TableBodyCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </TableWrapper>
    )
  },
}
