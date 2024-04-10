import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'

import s from './input.module.scss'

import { Typography } from '../typography'
import { CloseIcon, EyeIcon, SearchIcon } from './assets/icons'

export type InputProps = {
  defaultValue?: string
  errorMessage?: string
  label?: string
  onClear?: () => void
  onValueChange?: (value: string) => void
  search?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      defaultValue,
      disabled,
      errorMessage,
      id: externalId,
      label,
      onChange,
      onClear,
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

    const id = useId()
    const finalId = externalId ?? id

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      onValueChange?.(event.target.value)
    }

    const isShowClearButton = onClear && value

    return (
      <div>
        {label && (
          <Typography as={'label'} className={label} htmlFor={finalId} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div className={`${s.inputContainer} ${disabled ? s.disabled : ''} ${className}`}>
          <input
            className={`${s.input} ${errorMessage ? s.errorInput : ''} ${search ? s.search : ''} `}
            defaultValue={defaultValue}
            disabled={disabled}
            id={finalId}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
            type={type === 'password' && showPassword ? 'text' : type}
            value={value}
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
          {isShowClearButton && (
            <button className={s.clearButton} onClick={onClear}>
              <CloseIcon />
            </button>
          )}
        </div>
        {errorMessage && <div className={s.error}>{errorMessage}</div>}
      </div>
    )
  }
)
