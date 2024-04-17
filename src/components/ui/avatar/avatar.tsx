import { ComponentPropsWithoutRef } from 'react'

import defaultAvatar from '@/assets/images/defaultAvatar.jpg'
import clsx from 'clsx'

import s from './avatar.module.scss'

type AvatarProps = {
  avatar?: string
} & ComponentPropsWithoutRef<'img'>

export const Avatar = ({ avatar, className, ...rest }: AvatarProps) => {
  return (
    <img
      alt={'avatar'}
      className={clsx(s.avatar, className)}
      src={avatar ?? defaultAvatar}
      {...rest}
    />
  )
}
