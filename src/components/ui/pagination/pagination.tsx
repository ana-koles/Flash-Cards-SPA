import { ArrowLeftIcon } from '@/assets/icons/arrowLeft'
import { ArrowRightIcon } from '@/assets/icons/arrowRight'

import s from './pagination.module.scss'

import { usePagination } from './usePagination'

export type PaginationProps = {
  currentPage: number
  onChange: (currentPage: number) => void
  pageSize: number
  siblingCount?: number
  totalItemsCount: number
}

export const Pagination = ({
  currentPage,
  onChange,
  pageSize,
  siblingCount,
  totalItemsCount,
}: PaginationProps) => {
  const { handleNextPage, handlePageChange, handlePreviosPage, lastPage, paginationRange } =
    usePagination({
      currentPage,
      onChange,
      pageSize,
      siblingCount,
      totalItemsCount,
    })

  return (
    <div>
      <button disabled={currentPage === 1} onClick={handlePreviosPage}>
        <ArrowLeftIcon />
      </button>
      {paginationRange.map((page, index) => {
        if (typeof page !== 'number') {
          return <span key={index}>&#8230;</span>
        }

        return (
          <button key={index} onClick={handlePageChange(page)}>
            {page}
          </button>
        )
      })}
      <button disabled={currentPage === lastPage} onClick={handleNextPage}>
        <ArrowRightIcon />
      </button>
    </div>
  )
}
