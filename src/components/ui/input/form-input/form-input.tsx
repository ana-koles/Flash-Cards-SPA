import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps } from '../input'

// eslint-disable-next-line no-undef
export type FormInputProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<InputProps, 'onBlur' | 'onChange' | 'value'>

export const FormInput = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  label,
  name,
  ...restInputProps
}: FormInputProps<TFieldValues>) => {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  const def = defaultValue

  console.log(def)

  return (
    <Input
      {...restInputProps}
      defaultValue={defaultValue}
      errorMessage={error?.message}
      label={label}
      onBlur={onBlur}
      onValueChange={onChange}
      value={value}
    />
  )
}
