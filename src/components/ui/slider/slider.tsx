import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'
export type SliderProps = {
  ariaLabelMax?: string
  ariaLabelMin?: string
  label?: string
  value?: (number | undefined)[]
} & Omit<ComponentPropsWithoutRef<typeof RadixSlider.Root>, 'value'>

export const Slider = forwardRef<ElementRef<typeof RadixSlider.Root>, SliderProps>(
  (
    {
      ariaLabelMax,
      ariaLabelMin,
      className,
      label,
      max,
      min,
      onValueChange,
      title,
      value,
      ...rest
    },
    ref
  ) => {
    useEffect(() => {
      if (value?.[1] === undefined || value?.[1] === null) {
        onValueChange?.([value?.[0] ?? 0, max ?? 0])
      }
    }, [max, value, onValueChange])

    return (
      <div>
        <label>{label}</label>
        <div className={s.container}>
          <span className={s.display}>{value?.[0]}</span>
          <RadixSlider.Root
            className={`${s.sliderRoot} ${className}`}
            max={max}
            min={min}
            onValueChange={onValueChange}
            ref={ref}
            title={title}
            value={[value?.[0] ?? 0, value?.[1] ?? max ?? 0]}
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
      </div>
    )
  }
)
