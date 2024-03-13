import { ComponentPropsWithoutRef, ElementRef, ElementType, ForwardedRef, forwardRef } from 'react'

import { BackArrowIcon } from '@/assets/icons'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  back?: boolean
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const ButtonPolymorph = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    back,
    children,
    className,
    fullWidth,
    variant = 'primary',
    ...rest
  } = props

  return (
    <Component
      className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
    >
      {back && <BackArrowIcon />} {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReturnType<typeof ButtonPolymorph>
