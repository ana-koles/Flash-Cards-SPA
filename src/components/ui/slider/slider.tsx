import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'
export type SliderProps = {
  ariaLabelMax?: string
  ariaLabelMin?: string
} & ComponentPropsWithoutRef<typeof RadixSlider.Root>

export const Slider = forwardRef<ElementRef<typeof RadixSlider.Root>, SliderProps>(
  ({ ariaLabelMax, ariaLabelMin, className, max, min, onValueChange, value, ...rest }, ref) => {
    return (
      <div className={s.container}>
        <span className={s.display}>{value?.[0]}</span>
        <RadixSlider.Root
          className={`${s.sliderRoot} ${className}`}
          max={max}
          min={min}
          onValueChange={onValueChange}
          ref={ref}
          value={value}
          {...rest}
        >
          <RadixSlider.Track className={s.sliderTrack}>
            <RadixSlider.Range className={s.sliderRange} />
          </RadixSlider.Track>
          <RadixSlider.Thumb aria-label={ariaLabelMin} className={s.sliderThumb} />
          <RadixSlider.Thumb aria-label={ariaLabelMax} className={s.sliderThumb} />
        </RadixSlider.Root>
        <span className={s.display}> {value?.[1]} </span>
      </div>
    )
  }
)
