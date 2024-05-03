import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from './'

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationDefault: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItemsCount: 100,
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination {...args} currentPage={currentPage} onPageChange={page => setCurrentPage(page)} />
    )
  },
}

export const PaginationWithSelect: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItemsCount: 100,
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const selectOptions = [10, 20, 30, 50, 100]

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        itemsPerPage={perPage}
        onPageChange={page => setCurrentPage(page)}
        onPerPageChange={page => setPerPage(page)}
        perPageOptions={selectOptions}
      />
    )
  },
}
