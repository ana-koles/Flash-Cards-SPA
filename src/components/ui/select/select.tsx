import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { SelectArrowDown } from '@/assets/icons/selectArrowDown'
import { SelectArrowUp } from '@/assets/icons/selectArrowUp'
import { Typography } from '@/components/ui/typography'
import * as SelectPrimitive from '@radix-ui/react-select'
import { SelectGroup } from '@radix-ui/react-select'

import s from './select.module.scss'

export type SelectOption = {
  title: string
  value: string
}

export type SelectProps = {
  label?: string
  options?: SelectOption[]
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Root>, SelectProps>(
  ({ children, disabled, label, onOpenChange, open, options, placeholder, ...props }, ref) => {
    const selectOption = options?.map(el => (
      <SelectItem key={el.value} value={el.value}>
        {el.title}
      </SelectItem>
    ))

    return (
      <div className={s.container}>
        <Typography className={s.title} variant={'body2'}>
          {label}
        </Typography>
        <SelectPrimitive.Root onOpenChange={onOpenChange} open={open} {...props}>
          <SelectPrimitive.Trigger className={s.trigger} disabled={disabled} ref={ref}>
            <SelectPrimitive.Value className={s.value} placeholder={'Select Option'} />
            <SelectPrimitive.Icon className={s.icon}>
              {open ? <SelectArrowUp /> : <SelectArrowDown />}
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className={s.content}>
              <SelectPrimitive.Viewport>
                <SelectGroup>{selectOption}</SelectGroup>
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
    )
  }
)

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item className={s.item} {...props} ref={ref}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
