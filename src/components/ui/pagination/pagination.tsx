import { ArrowIcon } from '@/assets/icons'

import s from './pagination.module.scss'

import { usePagination } from './usePagination'

export type PaginationProps = {
  currentPage: number
  onPageChange: (pageNumber: number) => void
  pageSize: number
  siblingCount?: number
  totalItemsCount: number
}

export const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  siblingCount,
  totalItemsCount,
}: PaginationProps) => {
  const { handleNextPage, handlePageChange, handlePreviosPage, lastPage, paginationRange } =
    usePagination({
      currentPage,
      onPageChange,
      pageSize,
      siblingCount,
      totalItemsCount,
    })

  return (
    <div className={s.container}>
      <button className={s.arrowButton} disabled={currentPage === 1} onClick={handlePreviosPage}>
        <ArrowIcon />
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
        <ArrowIcon className={s.arrowRight} />
      </button>
    </div>
  )
}