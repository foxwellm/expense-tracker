'use client'

import Slider from '@mui/material/Slider'
import { Dayjs } from 'dayjs'

import { useBreakpoint } from '@/app/_hooks'
import { useDateRangeStore, useExpensesStore } from '@/store'

export function DateRangeSlider({
  marks,
}: {
  marks: { value: number; label: string; date: Dayjs }[]
}) {
  const { isMobile, isTablet } = useBreakpoint()
  const setStartDayjsDate = useExpensesStore((s) => s.setStartDayjsDate)
  const setEndDayjsDate = useExpensesStore((s) => s.setEndDayjsDate)
  const range = useDateRangeStore((s) => s.range)
  const setRange = useDateRangeStore((s) => s.setRange)

  const onSubmit = () => {
    setStartDayjsDate(marks[range[0]].date)
    setEndDayjsDate(marks[range[1]].date)
  }

  return (
    <Slider
      value={range}
      size={isMobile ? 'small' : 'medium'}
      onChange={(_, newVal) => setRange(newVal as [number, number])}
      onChangeCommitted={onSubmit}
      orientation={isTablet ? 'horizontal' : 'vertical'}
      min={0}
      max={11}
      step={1}
      marks={marks}
      disableSwap
      sx={{
        ...(isTablet
          ? {
              '& .MuiSlider-markLabel': {
                transform: 'rotate(45deg) translateY(100%)',
                fontSize: 12,
              },
            }
          : {}),
      }}
    />
  )
}
