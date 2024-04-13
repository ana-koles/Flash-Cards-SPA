import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio-group.module.scss'

export type RadioGroupProps = {
  errorMessage?: string
} & ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>

export const RadioGroup = forwardRef<ElementRef<typeof RadixRadioGroup.Root>, RadioGroupProps>(
  (
    { children, className, defaultValue, disabled, errorMessage, onValueChange, value, ...rest },
    ref
  ) => (
    <RadixRadioGroup.Root
      className={clsx(s.root, className)}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={onValueChange}
      ref={ref}
      value={value}
      {...rest}
    >
      {children}
    </RadixRadioGroup.Root>
  )
)

export type ItemProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>

export const RadioItem = forwardRef<ElementRef<typeof RadixRadioGroup.Item>, ItemProps>(
  ({ className, id, label, value, ...rest }, ref) => {
    const generatedId = useId()
    const finalId = id ?? generatedId

    return (
      <div className={s.wrapper}>
        <RadixRadioGroup.Item className={s.item} id={finalId} value={value} {...rest} ref={ref}>
          <RadixRadioGroup.Indicator className={s.indicator} />
        </RadixRadioGroup.Item>
        <label className={s.label} htmlFor={finalId}>
          {label}
        </label>
      </div>
    )
  }
)
