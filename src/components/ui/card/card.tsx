import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";

import s from './card.module.scss'
import clsx from "clsx";


type InferType<T> = T extends ElementType<infer U> ? U : never

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export const Card = forwardRef(<T extends ElementType = 'div'>(props: CardProps<T>, ref: InferType<T>) => {
  const { as: Component = 'div', className, ...rest } = props

  return <Component className={clsx(s.card, className)} ref={ref} {...rest} />
}
)