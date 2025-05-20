'use client'

import Box from '@mui/material/Box'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { useExpensesStore } from '@/store'

import { useBreakpoint } from '../_hooks'
dayjs.extend(isSameOrAfter)

export function ChartDateBounds() {
  const { isTablet } = useBreakpoint()
  const startDayjsDate = useExpensesStore((s) => s.startDayjsDate)
  const endDayjsDate = useExpensesStore((s) => s.endDayjsDate)
  const setStartDayjsDate = useExpensesStore((s) => s.setStartDayjsDate)
  const setEndDayjsDate = useExpensesStore((s) => s.setEndDayjsDate)

  const furthestPastDate = dayjs().subtract(2, 'years')

  return (
    <Box
      display="flex"
      flexDirection={isTablet ? 'column' : 'row'}
      justifyContent="space-evenly"
      alignItems={'center'}
      marginTop={isTablet ? 9 : 2}
    >
      <DatePicker
        views={['month', 'year']}
        value={startDayjsDate}
        onChange={(newValue) => setStartDayjsDate(newValue)}
        disableFuture
        minDate={furthestPastDate}
        label="Start Date"
        slotProps={{
          textField: {
            required: true,
            sx: {
              width: '200px',
            },
          },
        }}
      />

      <DatePicker
        views={['month', 'year']}
        value={endDayjsDate}
        onChange={(newValue) => setEndDayjsDate(newValue)}
        disableFuture
        minDate={furthestPastDate}
        label="End Date"
        slotProps={{
          textField: {
            required: true,
            sx: {
              width: '200px',
              mt: isTablet ? 2 : 0,
            },
          },
        }}
      />
    </Box>
  )
}
