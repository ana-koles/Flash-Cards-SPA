import { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import s from './avatar.module.scss'

export const Avatar = ({ className, ...rest }: ComponentPropsWithoutRef<'img'>) => {
  return <img alt={'avatar'} className={clsx(s.avatar, className)} {...rest} />
}
