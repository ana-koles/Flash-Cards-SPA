import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

export type CardProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

type Props = <T extends ElementType = 'div'>(props: CardProps<T>, ref: ElementRef<T>) => ReactNode

export const Card: Props = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps<T>, ref: ElementRef<T>) => {
    const { as, className, ...rest } = props
    const Component: ElementType = as || 'div'

    return <Component className={clsx(s.card, className)} ref={ref} {...rest} />
  }
)
