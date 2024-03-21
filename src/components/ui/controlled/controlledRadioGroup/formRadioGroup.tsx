import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radioGroup/radioGroup'

type RadioGroupFormProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<RadioGroupProps, 'id' | 'name' | 'onChange' | 'value'>

export const FormRadioGroup = <TFieldValues extends FieldValues = FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  options,
  ...rest
}: RadioGroupFormProps<TFieldValues>) => {
  const {
    field: { onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
  })

  return (
    <RadioGroup
      errorMessage={error?.message}
      onValueChange={onChange}
      options={options}
      ref={ref}
      value={value}
      {...rest}
    />
  )
}
