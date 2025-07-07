'use client'

import { Controller, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form'
import RangeSlider from '../range-slider/RangeSlider'

type RangeSliderConnectProps<
  F extends FieldValues,
  N extends FieldPath<F>
> = {
  name: N
  defaultValue: FieldPathValue<F, N>
}

const RangeSliderConnect = <
  F extends FieldValues,
  N extends FieldPath<F>
>({
  name,
  defaultValue,
}: RangeSliderConnectProps<F, N>) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <RangeSlider
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  )
}

export default RangeSliderConnect
