import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import s from './slider.module.scss'
import * as RadixSlider from '@radix-ui/react-slider'
export type SliderProps = {
  ariaLabelMin?: string
  ariaLabelMax?: string
} & ComponentPropsWithoutRef<typeof RadixSlider.Root>

export const Slider = forwardRef<ElementRef<typeof RadixSlider.Root>, SliderProps>(
  ({ className, value, ariaLabelMax, ariaLabelMin, onValueChange, max, min, ...rest }, ref) => {
    return (
      <div className={s.container}>
        <span className={s.display}>{value?.[0]}</span>
        <RadixSlider.Root
          className={`${s.sliderRoot} ${className}`}
          onValueChange={onValueChange}
          max={max}
          min={min}
          value={value}
          ref={ref}
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