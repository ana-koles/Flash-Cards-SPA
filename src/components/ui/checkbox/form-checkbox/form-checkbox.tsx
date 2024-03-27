import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '../checkbox'

export type FormCheckboxProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<CheckboxProps, 'onBlur' | 'onChange' | 'value'>

export const FormCheckbox = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: FormCheckboxProps<TFieldValues>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    defaultValue,
    name, //название поля за к-ым мы следим
    shouldUnregister,
  })

  return (
    <Checkbox
      checked={value}
      onBlur={onBlur}
      onCheckedChange={onChange}
      ref={ref}
      {...checkboxProps}
    />
  )
}
