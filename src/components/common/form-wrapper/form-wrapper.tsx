import { ComponentPropsWithRef, ReactNode } from 'react'

import clsx from 'clsx'

import s from './form-wrapper.module.scss'

type Props = {
  children: ReactNode
} & ComponentPropsWithRef<'div'>

export const FormWrapper = ({ children, className, ...restProps }: Props) => {
  return (
    <div className={clsx(s.wrapper, className)} {...restProps}>
      {children}
    </div>
  )
}
