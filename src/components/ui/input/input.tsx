import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import s from './input.module.scss'

import { CloseIcon, EyeIcon, SearchIcon } from './assets/icons'

export type InputProps = {
  errorMessage?: string
  label?: string
  onValueChange?: (value: string) => void
  search?: boolean

} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      errorMessage,
      id,
      label,
      onChange,
      onValueChange,
      placeholder,
      search,
      type,
      value,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      onValueChange?.(event.target.value)
    }

    return (
      <div>
        {label && (
          <label className={s.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={`${s.inputContainer} ${disabled ? s.disabled : ''}`}>
          <input
            className={`${s.input} ${errorMessage ? s.errorInput : ''} ${search ? s.search : ''} ${className}`}
            disabled={disabled}
            id={id}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
            type={type === 'password' && showPassword ? 'text' : type}
            {...rest}
          />
          {type === 'password' && (
            <button
              className={s.showOrHidePassword}
              disabled={disabled}
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <CloseIcon /> : <EyeIcon className={s.eyeIcon} />}
            </button>
          )}
          {search && <SearchIcon className={s.searchIcon} />}
          {search && <CloseIcon className={`${s.closeIcon}`} />}
        </div>
        {errorMessage && <div className={s.error}>{errorMessage}</div>}
      </div>
    )
  }
)
