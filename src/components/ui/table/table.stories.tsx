import type { Meta, StoryObj } from '@storybook/react'

import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
} from './table'

const meta = {
  argTypes: {},
  component: TableWrapper,
  tags: ['autodocs'],
  title: 'Components/ Table',
} satisfies Meta<typeof TableWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Table: Story = {
  args: {
    children: <></>,
  },
  render: () => {
    const tableColumnNames = ['Name', 'Cards', 'Last Updated', 'Created by', '']

    const tableContent = [
      { cards: 19, createdBy: 'Nick', icons: '*', name: 'JS', udpate: '22-01-2024' },
      { cards: 9, createdBy: 'Bob', icons: '?', name: 'React', udpate: '01-01-2024' },
      { cards: 20, createdBy: 'Lili', icons: '@', name: 'TS', udpate: '22-11-2023' },
    ]

    return (
      <TableWrapper>
        <TableHead>
          <TableHeadRow>
            {tableColumnNames.map(name => (
              <TableHeadCell key={name}>{name}</TableHeadCell>
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
              <TableBodyCell key={`${card.icons + index}`}>{card.icons}</TableBodyCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </TableWrapper>
    )
  },
}
