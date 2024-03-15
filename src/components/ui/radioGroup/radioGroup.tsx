import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

export type RadioOption = {
  label: string
  value: string
}
export type RadioGroupProps = {
  options: RadioOption[]
} & ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>

export const RadioGroup = forwardRef<ElementRef<typeof RadixRadioGroup.Root>, RadioGroupProps>(
  ({ defaultValue, disabled, onValueChange, options, ...rest }, ref) => {
    const radioOption = options.map(el => (
      <div className={s.wrapper} key={el.value}>
        <RadixRadioGroup.Item className={s.item} value={el.value}>
          <RadixRadioGroup.Indicator className={s.indicator} />
        </RadixRadioGroup.Item>
        <label className={s.label} htmlFor={el.value}>
          {el.label}
        </label>
      </div>
    ))

    return (
      <div>
        <RadixRadioGroup.Root
          className={s.root}
          defaultValue={defaultValue}
          disabled={disabled}
          onValueChange={onValueChange}
          ref={ref}
          {...rest}
        >
          {radioOption}
        </RadixRadioGroup.Root>
      </div>
    )
  }
)
