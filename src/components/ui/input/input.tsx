import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import s from './input.module.scss'

import closeIcon from './assets/close-outline.svg'
import eyeIcon from './assets/eye-outline.svg'
import loupe from './assets/search-outline.svg'


export type InputProps = {
  errorMessage?: string
  label?: string
  onValueChange?: (value: string) => void
  search?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Input = ({
  className,
  disabled = false,
  errorMessage,
  label,
  name,
  onChange,
  onValueChange,
  placeholder = 'input',
  search,
  type = 'text',
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState(type)

  const handleEyeClick = () => {
    setShowPassword(!showPassword)
    setInputType(showPassword ? 'text' : 'password')
  }


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    onValueChange?.(event.target.value)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  return (
    <div className={s.inputContainer}>
      {label && (
        <label className={s.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={`${s.input} ${errorMessage ? s.error : ''} ${search ? s.inputSearch : ''} `}
        disabled={disabled}
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        type={inputType}
        // eslint-disable-next-line no-nested-ternary, perfectionist/sort-jsx-props
        placeholder={!isFocused && errorMessage ? errorMessage : !isFocused ? placeholder : ''}
        {...rest}
      />
      {type === 'password' &&
        <button className={s.eyeIconWrapper} onClick={handleEyeClick}>
          <img alt={'eye_icon'} className={s.eyeIcon} src={eyeIcon} />
        </button>
      }
      {search && <img alt={'loupe'} className={s.loupe} src={loupe} />}
      {search && isFocused && <img alt={'close'} className={s.closeIcon} src={closeIcon} />}
      {errorMessage && <div className={s.error}>{errorMessage}</div>}
    </div>
  )
}
