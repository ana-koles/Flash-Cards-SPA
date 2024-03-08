import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<'div'>

export const Card = <T extends ElementType = 'div'>(props: CardProps<T>) => {
  const { as: Component = 'div', className, ...rest } = props

  return <Component className={`${s.card} ${className}`} {...rest} />
}
