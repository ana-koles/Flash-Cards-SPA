import { ArrowIcon } from '@/assets/icons'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Select, SelectItem } from '../select'
import { Typography } from '../typography'
import { usePagination } from './usePagination'

export type PaginationProps = {
  className?: string
  currentPage: number
  itemsPerPage: number
  onPageChange: (pageNumber: number) => void
  onPerPageChange?: (itemsPerPage: number) => void
  perPageOptions?: number[]
  siblingCount?: number
  totalItemsCount: number
}

export const Pagination = ({
  className,
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
    <div className={clsx(s.container, className)}>
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
      <Typography as={'span'} variant={'body2'}>
        Show
      </Typography>
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
      <Typography as={'span'} variant={'body2'}>
        on page
      </Typography>
    </div>
  )
}
