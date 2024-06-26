import { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'icon' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

type InferType<T> = T extends ElementType<infer U> ? U : never

const ButtonPolymorph = <T extends ElementType = 'button'>(
  props: ButtonProps<T>,
  ref: ForwardedRef<InferType<T>>
) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    variant = 'primary',
    ...rest
  } = props

  const classNames = {
    button: clsx(s.button, s[variant], fullWidth && s.fullWidth, className),
  }

  return (
    <Component className={classNames.button} ref={ref} {...rest}>
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReturnType<typeof ButtonPolymorph>
