import { CheckboxIndicatorIcon } from '@/assets/icons'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
  required?: boolean
}

export const Checkbox = ({
  checked,
  className,
  disabled,
  id,
  label,
  onChange,
  required,
}: CheckboxProps) => {
  return (
    <form>
      <div className={`${s.container} ${className}`}>
        <div className={`${s.buttonWrapper} ${disabled ? s.disabled : ''}`}>
          <CheckboxRadix.Root
            checked={checked}
            className={s.root}
            disabled={disabled}
            id={id}
            onCheckedChange={onChange}
            required={required}
          >
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
    </form>
  )
}
