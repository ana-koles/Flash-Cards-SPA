import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radioGroup/radioGroup'

type RadioGroupFormProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<RadioGroupProps, 'id' | 'name' | 'onChange' | 'value'>

export const RadioGroupForm = <TFieldValues extends FieldValues = FieldValues>({
  className,
  control,
  defaultValue,
  disabled,
  name,
  options,
  ...rest
}: RadioGroupFormProps<TFieldValues>) => {
  const {
    field: { onChange, ref, value },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
  })

  return <RadioGroup onValueChange={onChange} options={options} ref={ref} value={value} {...rest} />
}
