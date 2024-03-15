import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>

type Props = <T extends ElementType = 'p'>(
  props: TypographyProps<T>,
  ref: ElementRef<T>
) => ReactNode

export const Typography: Props = forwardRef(
  <T extends ElementType = 'p'>(props: TypographyProps<T>, ref: ElementRef<T>) => {
    const { as, className, variant = 'body1', ...rest } = props
    const Component: ElementType = as || 'p'

    return <Component className={clsx(s.typography, s[variant], className)} ref={ref} {...rest} />
  }
)
