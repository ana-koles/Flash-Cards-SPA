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
    <div className={s.container}>
      <button className={s.arrowButton} disabled={currentPage === 1} onClick={handlePreviosPage}>
        <ArrowLeftIcon />
      </button>
      {paginationRange.map((page, index) => {
        if (typeof page !== 'number') {
          return (
            <span className={s.dots} key={index}>
              &#8230;
            </span>
          )
        }

        return (
          <button
            className={`${s.pageButton} ${page === currentPage ? s.selected : ''}`}
            key={index}
            onClick={handlePageChange(page)}
          >
            {page}
          </button>
        )
      })}
      <button
        className={s.arrowButton}
        disabled={currentPage === lastPage}
        onClick={handleNextPage}
      >
        <ArrowRightIcon />
      </button>
    </div>
  )
}
