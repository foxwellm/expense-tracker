'use client'

import Slider from '@mui/material/Slider'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

import { useExpensesStore } from '@/store'

export function DateRangeSlider({
  marks,
}: {
  marks: { value: number; label: string; date: Dayjs }[]
}) {
  const setStartDayjsDate = useExpensesStore((s) => s.setStartDayjsDate)
  const setEndDayjsDate = useExpensesStore((s) => s.setEndDayjsDate)
  const [range, setRange] = useState<[number, number]>([9, 11])

  const onSubmit = () => {
    setStartDayjsDate(marks[range[0]].date)
    setEndDayjsDate(marks[range[1]].date)
  }

  return (
    <Slider
      value={range}
      onChange={(_, newVal) => setRange(newVal as [number, number])}
      onChangeCommitted={onSubmit}
      orientation="vertical"
      min={0}
      max={11}
      step={1}
      marks={marks}
      disableSwap
    />
  )
}
