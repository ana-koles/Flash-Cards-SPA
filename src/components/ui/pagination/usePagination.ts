import { useMemo } from 'react'

type Props = {
  currentPage: number
  onPageChange: (pageNumber: number) => void
  pageSize: number
  siblingCount?: number
  totalItemsCount: number
}

type PaginationRange = ('...' | number)[]

const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

const DOTS = '...'

export const usePagination = ({
  currentPage,
  onPageChange,
  pageSize,
  siblingCount = 1,
  totalItemsCount,
}: Props) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalItemsCount / pageSize)
    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalItemsCount, pageSize, siblingCount, currentPage]) as PaginationRange

  const handleNextPage = () => {
    onPageChange(currentPage + 1)
  }

  const handlePreviosPage = () => {
    onPageChange(currentPage - 1)
  }

  const handlePageChange = (pageNumber: number) => {
    return () => onPageChange(pageNumber)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return {
    handleNextPage,
    handlePageChange,
    handlePreviosPage,
    lastPage,
    paginationRange,
  }
}
