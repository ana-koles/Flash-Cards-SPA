import { ComponentPropsWithoutRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderProps = {
  label?: string
  onValueChange?: (value: number[]) => void
  value?: number[]
} & ComponentPropsWithoutRef<typeof RadixSlider.Root>

export const Slider = (props: SliderProps) => {
  const { className, label, max, onValueChange, value, ...rest } = props

  return (
    <div>
      <div className={s.container}>
        <span className={s.display}>{value?.[0]}</span>
        <RadixSlider.Root
          className={`${s.sliderRoot} ${className}`}
          defaultValue={[0, 100]}
          max={max}
          onValueChange={onValueChange}
          value={value}
          {...rest}
        >
          <RadixSlider.Track className={s.sliderTrack}>
            <RadixSlider.Range className={s.sliderRange} />
          </RadixSlider.Track>
          <RadixSlider.Thumb aria-label={`min`} className={s.sliderThumb} />
          <RadixSlider.Thumb aria-label={`max`} className={s.sliderThumb} />
        </RadixSlider.Root>
        <span className={s.display}> {value?.[1]} </span>
      </div>
    </div>
  )
}
