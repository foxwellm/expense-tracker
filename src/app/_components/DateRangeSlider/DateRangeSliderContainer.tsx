'use client'

import { DateRangeSlider } from './DateRangeSlider'
import { getDateRangeSliderMarks } from './utils/marks'

export function DateRangeSliderContainer() {
  const marks = getDateRangeSliderMarks()

  return <DateRangeSlider marks={marks} />
}
