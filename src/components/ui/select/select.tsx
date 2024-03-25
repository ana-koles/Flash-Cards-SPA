import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { SelectArrowDown } from '@/assets/icons/selectArrowDown'
import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type SelectProps = {
  className?: string
  label?: string
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Root>, SelectProps>(
  ({ children, className, disabled, label, onOpenChange, open, placeholder, ...props }, ref) => (
    <SelectPrimitive.Root onOpenChange={onOpenChange} open={open} {...props}>
      {label && <div className={s.title}>{label}</div>}
      <SelectPrimitive.Trigger className={clsx(s.trigger, className)} disabled={disabled} ref={ref}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className={s.icon}>
          <SelectArrowDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={s.content}
          collisionPadding={0}
          position={'popper'}
          sticky={'always'}
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
)
export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item className={s.item} {...props} ref={ref}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
