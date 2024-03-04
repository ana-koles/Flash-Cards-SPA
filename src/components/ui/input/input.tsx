import { ComponentPropsWithoutRef } from 'react'

import s from './input.module.scss'

import eyeIcon from './eye-outline.svg'
import loupe from './search-outline.svg'

type InputType = 'password' | 'text'

export type InputProps = {
  type?: InputType
  variant?: 'inputField' | 'searchField'
} & ComponentPropsWithoutRef<'input'>

export const Input = ({
  className,
  name,
  placeholder = 'input',
  type = 'text',
  variant = 'inputField',
  ...rest
}: InputProps) => {
  return (
    <div>
      {variant === 'inputField' && (
        <label className={s.label} htmlFor={name}>
          {placeholder}{' '}
        </label>
      )}
      <input className={s.input} id={name} name={name} placeholder={placeholder} {...rest} />
      {(type === 'password' && <img alt={'eye_icon'} className={'eye-icon'} src={eyeIcon} />) ||
        (variant === 'searchField' && <img alt={'loupe'} className={'loupe'} src={loupe} />)}
    </div>
  )
}
