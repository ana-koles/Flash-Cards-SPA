import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CheckboxIndicatorIcon } from '@/assets/icons'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  label?: ReactNode
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ className, disabled, id, label, ...rest }, ref) => {
    return (
      <div className={`${s.container} ${className}`}>
        <div className={`${s.buttonWrapper} ${disabled ? s.disabled : ''}`}>
          <CheckboxRadix.Root className={s.root} id={id} ref={ref} {...rest}>
            <CheckboxRadix.Indicator className={s.indicator}>
              <CheckboxIndicatorIcon />
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
        </div>
        {label && (
          <label className={`${s.label} ${disabled ? s.disabledLabel : ''}`} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    )
  }
)
