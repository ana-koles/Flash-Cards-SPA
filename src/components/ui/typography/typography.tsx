import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './typography.module.scss'

type InferType<T> = T extends ElementType<infer U> ? U : never

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

export const Typography = forwardRef(
  <T extends ElementType = 'p'>(props: TypographyProps<T>, ref: ForwardedRef<InferType<T>>) => {
    const { as: Component = 'p', className, variant = 'body1', ...rest } = props

    return <Component className={clsx(s.typography, s[variant], className)} ref={ref} {...rest} />
  }
)
