import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import s from './input.module.scss'

import closeIcon from './assets/close-outline.svg'
import eyeIcon from './assets/eye-outline.svg'
import loupe from './assets/search-outline.svg'

type InputType = 'password' | 'text'

export type InputProps = {
  type?: InputType
  variant?: 'inputField' | 'searchField'
} & ComponentPropsWithoutRef<'input'>

export const Input = ({
  className,
  disabled = false,
  name,
  onChange,
  placeholder = 'input',
  type = 'text',
  variant = 'inputField',
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (value.trim() === '') {
      setError('This field is required')
    } else {
      setError('')
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  return (
    <div className={s.inputContainer}>
      {variant === 'inputField' && (
        <label className={s.label} htmlFor={name}>
          {placeholder}
        </label>
      )}
      <input
        className={`${s.input} ${error ? s.error : ''} ${variant === 'searchField' ? s.inputSearch : ''} `}
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        // eslint-disable-next-line no-nested-ternary
        placeholder={!isFocused && error ? error : !isFocused ? placeholder : ''}
        {...rest}
      />
      {(type === 'password' && <img alt={'eye_icon'} className={s.eyeIcon} src={eyeIcon} />) ||
        (variant === 'searchField' && <img alt={'loupe'} className={s.loupe} src={loupe} />)}
      {variant === 'searchField' && isFocused && (
        <img alt={'close'} className={s.closeIcon} src={closeIcon} />
      )}
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}
