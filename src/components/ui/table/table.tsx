import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import s from './table.module.scss'

type TableWrapperProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'table'>

export const TableWrapper = forwardRef<HTMLTableElement, TableWrapperProps>(
  ({ children, className, ...restProps }: TableWrapperProps, ref) => {
    return (
      <table className={s.tableWrapper} {...restProps} ref={ref}>
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
      <thead className={s.tableHead} {...restProps} ref={ref}>
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
      <tr className={`${s.tableRow} ${s.tableHeadRow}`} {...restProps} ref={ref}>
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
      <th className={s.tableCell} {...restProps} ref={ref}>
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
      <tbody className={s.tableBody} {...restProps} ref={ref}>
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
      <tr className={s.tableRow} {...restProps} ref={ref}>
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
      <td className={s.tableCell} {...restProps} ref={ref}>
        {children}
      </td>
    )
  }
)

TableBodyCell.displayName = 'TableBodyCell'
