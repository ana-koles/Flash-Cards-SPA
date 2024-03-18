import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Input, InputProps } from '../input'

export type FormInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  errorMessage: string | undefined
  name: FieldPath<TFieldValues>
} & Omit<InputProps, 'onBlur' | 'onChange' | 'value'>

export const FormInput = <TFieldValues extends FieldValues>({
  control,
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
      errorMessage={errorMessage}
      label={label}
      onBlur={onBlur}
      onValueChange={onChange}
      value={value}
      {...restInputProps}
    />
  )
}
