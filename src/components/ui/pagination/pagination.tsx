import { ArrowIcon } from '@/assets/icons'

import s from './pagination.module.scss'

import { Select, SelectItem } from '../select'
import { usePagination } from './usePagination'

export type PaginationProps = {
  currentPage: number
  itemsPerPage: number
  onPageChange: (pageNumber: number) => void
  onPerPageChange?: (itemsPerPage: number) => void
  perPageOptions?: number[]
  siblingCount?: number
  totalItemsCount: number
}

export const Pagination = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onPerPageChange,
  perPageOptions,
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

  const showPerPageSelect = !!itemsPerPage && !!perPageOptions && !!onPerPageChange

  return (
    <div className={s.container}>
      <div className={s.root}>
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

        {showPerPageSelect && (
          <PerPageSelect {...{ itemsPerPage, onPerPageChange, perPageOptions }} />
        )}
      </div>
    </div>
  )
}

export type PerPageSelectProps = {
  itemsPerPage: number
  onPerPageChange: (itemsPerPage: number) => void
  perPageOptions: number[]
}

export const PerPageSelect = ({
  itemsPerPage,
  onPerPageChange,
  perPageOptions,
}: PerPageSelectProps) => {
  return (
    <div className={s.selectWrapper}>
      Show
      <Select
        className={s.select}
        onValueChange={page => onPerPageChange(Number(page))}
        pagination
        value={String(itemsPerPage)}
      >
        {perPageOptions.map(option => {
          return (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          )
        })}
      </Select>
      on page
    </div>
  )
}
