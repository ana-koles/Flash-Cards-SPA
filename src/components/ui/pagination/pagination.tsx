import { ArrowIcon } from '@/assets/icons'

import s from './pagination.module.scss'

import { usePagination } from './usePagination'

export type PaginationProps = {
  currentPage: number
  itemsPerPage: number
  onPageChange: (pageNumber: number) => void
  siblingCount?: number
  totalItemsCount: number
}

export const Pagination = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  siblingCount,
  totalItemsCount,
}: PaginationProps) => {
  const { handleNextPage, handlePageChange, handlePreviosPage, lastPage, paginationRange } =
    usePagination({
      currentPage,
      itemsPerPage,
      onPageChange,
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
