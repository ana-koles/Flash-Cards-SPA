import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps } from '../input'

// eslint-disable-next-line no-undef
export type FormInputProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<InputProps, 'onBlur' | 'onChange' | 'value'>

export const FormInput = <TFieldValues extends FieldValues>({
  control,
  disabled,
  errorMessage,
  label,
  name,
  ...restInputProps
}: FormInputProps<TFieldValues>) => {
  const {
    field: { onBlur, onChange, value },
  } = useController({
    control,
    name,
  })

  return (
    <Input
      disabled={disabled}
      errorMessage={errorMessage}
      label={label}
      onBlur={onBlur}
      onValueChange={onChange}
      value={value}
      {...restInputProps}
    />
  )
}
