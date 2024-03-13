import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

export const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cards</th>
          <th>Last Updated</th>
          <th>Created by</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Card 1</td>
          <td>5</td>
          <td>24-01-2024</td>
          <td>Jane</td>
          <td>+</td>
        </tr>
        <tr>
          <td>Card 2</td>
          <td>4</td>
          <td>01-01-2024</td>
          <td>Nicky</td>
          <td>?</td>
        </tr>
      </tbody>
    </table>
  )
}

type TableWrapperProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'table'>

export const TableWrapper = forwardRef<HTMLTableElement, TableWrapperProps>(
  ({ children, className, ...restProps }: TableWrapperProps, ref) => {
    return (
      <table className={''} {...restProps} ref={ref}>
        {children}
      </table>
    )
  }
)

TableWrapper.displayName = 'TableWrapper'

type TableHeadProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'thead'>

export const TableHead = forwardRef<ElementRef<'thead'>, TableHeadProps>(
  ({ children, className, ...restProps }: TableHeadProps, ref) => {
    return (
      <thead className={''} {...restProps} ref={ref}>
        {children}
      </thead>
    )
  }
)

TableHead.displayName = 'TableHead'

type TableHeadRowProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'tr'>

export const TableHeadRow = forwardRef<ElementRef<'tr'>, TableHeadRowProps>(
  ({ children, className, ...restProps }: TableHeadRowProps, ref) => {
    return (
      <tr className={''} {...restProps} ref={ref}>
        {children}
      </tr>
    )
  }
)

TableHeadRow.displayName = 'TableHeadRow'

type TableHeadCellProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'th'>

export const TableHeadCell = forwardRef<ElementRef<'th'>, TableHeadCellProps>(
  ({ children, className, ...restProps }: TableHeadCellProps, ref) => {
    return (
      <th className={''} {...restProps} ref={ref}>
        {children}
      </th>
    )
  }
)

TableHeadCell.displayName = 'TableHeadCell'

type TableBodyProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'tbody'>

export const TableBody = forwardRef<ElementRef<'tbody'>, TableBodyProps>(
  ({ children, className, ...restProps }: TableBodyProps, ref) => {
    return (
      <tbody className={''} {...restProps} ref={ref}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

type TableBodyRowProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'tr'>

export const TableBodyRow = forwardRef<ElementRef<'tr'>, TableBodyRowProps>(
  ({ children, className, ...restProps }: TableBodyRowProps, ref) => {
    return (
      <tr className={''} {...restProps} ref={ref}>
        {children}
      </tr>
    )
  }
)

TableBodyRow.displayName = 'TableBodyRow'

type TableBodyCellProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'td'>

export const TableBodyCell = forwardRef<ElementRef<'td'>, TableBodyCellProps>(
  ({ children, className, ...restProps }: TableBodyCellProps, ref) => {
    return (
      <td className={''} {...restProps} ref={ref}>
        {children}
      </td>
    )
  }
)

TableBodyCell.displayName = 'TableBodyCell'
