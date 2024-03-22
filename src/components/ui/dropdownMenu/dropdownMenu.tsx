import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdownMenu.module.scss'

export const Dropdown = RadixDropdownMenu.Root

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>(({ align = 'end', children, className, ...rest }, ref) => (
  <RadixDropdownMenu.Portal>
    <RadixDropdownMenu.Content
      align={align}
      className={clsx(s.content, className)}
      ref={ref}
      {...rest}
    >
      <RadixDropdownMenu.Arrow asChild>
        <div className={s.arrow} />
      </RadixDropdownMenu.Arrow>
      <div>{children}</div>
    </RadixDropdownMenu.Content>
  </RadixDropdownMenu.Portal>
))

export const DropdownMenuTrigger = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Trigger>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Trigger>
>(({ className, ...rest }, ref) => (
  <RadixDropdownMenu.Trigger className={className} ref={ref} {...rest} />
))

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
>(({ className, ...rest }, ref) => (
  <RadixDropdownMenu.Item className={className} ref={ref} {...rest} />
))

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Separator>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>
>(({ className, ...rest }, ref) => (
  <RadixDropdownMenu.Separator className={clsx(s.separator, className)} ref={ref} {...rest} />
))

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Label>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>
>(({ className, ...rest }, ref) => (
  <RadixDropdownMenu.Label className={className} ref={ref} {...rest} />
))
