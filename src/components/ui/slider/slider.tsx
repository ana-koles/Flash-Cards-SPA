import { ComponentPropsWithoutRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderProps = {
  ariaLabelMax?: string
  ariaLabelMin?: string
  label?: string
} & ComponentPropsWithoutRef<typeof RadixSlider.Root>

export const Slider = (props: SliderProps) => {
  const { ariaLabelMax, ariaLabelMin, className, label, value, ...rest } = props

  return (
    <div>
      <div className={s.container}>
        <span className={s.display}>{value?.[0]}</span>
        <RadixSlider.Root className={`${s.sliderRoot} ${className}`} value={value} {...rest}>
          <RadixSlider.Track className={s.sliderTrack}>
            <RadixSlider.Range className={s.sliderRange} />
          </RadixSlider.Track>
          <RadixSlider.Thumb aria-label={ariaLabelMin} className={s.sliderThumb} />
          <RadixSlider.Thumb aria-label={ariaLabelMax} className={s.sliderThumb} />
        </RadixSlider.Root>
        <span className={s.display}> {value?.[1]} </span>
      </div>
    </div>
  )
}