import { ComponentPropsWithoutRef, useState } from 'react'

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
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={s.inputContainer}>
      {variant === 'inputField' && (
        <label className={s.label} htmlFor={name}>
          {placeholder}{' '}
        </label>
      )}
      <input
        className={s.input}
        id={name}
        name={name}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        placeholder={!isFocused ? placeholder : ''}
        {...rest}
      />
      {(type === 'password' && <img alt={'eye_icon'} className={s.eyeIcon} src={eyeIcon} />) ||
        (variant === 'searchField' && <img alt={'loupe'} className={s.loupe} src={loupe} />)}
    </div>
  )
}
