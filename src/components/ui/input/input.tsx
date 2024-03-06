import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import s from './input.module.scss'

import closeIcon from './assets/close-outline.svg'
import eyeIcon from './assets/eye-outline.svg'
import loupe from './assets/search-outline.svg'

export type InputType = 'password' | 'text'

export type InputProps = {
  label?: string
  onValueChange?: (value: string) => void
  search?: boolean
  type?: InputType
} & ComponentPropsWithoutRef<'input'>

export const Input = ({
  className,
  disabled = false,
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
  const [error, setError] = useState<null | string>(null)
  const [value, setValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState(type)

  const handleEyeClick = () => {
    setShowPassword(!showPassword)
    setInputType(showPassword ? 'text' : 'password')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onChange?.(event)
    onValueChange?.(event.target.value)
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
      {label && (
        <label className={s.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={`${s.input} ${error ? s.error : ''} ${search ? s.inputSearch : ''} `}
        disabled={disabled}
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        // eslint-disable-next-line no-nested-ternary
        placeholder={!isFocused && error ? error : !isFocused ? placeholder : ''}
        type={inputType}
        {...rest}
      />
      {type === 'password' &&
        <button className={s.eyeIconWrapper} onClick={handleEyeClick}>
          <img alt={'eye_icon'} className={s.eyeIcon} src={eyeIcon} />
        </button>
      }
      {search && <img alt={'loupe'} className={s.loupe} src={loupe} />}
      {search && isFocused && <img alt={'close'} className={s.closeIcon} src={closeIcon} />}
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}
