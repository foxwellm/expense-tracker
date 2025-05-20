'use client'

import Box from '@mui/material/Box'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useState } from 'react'
dayjs.extend(isSameOrAfter)

export function ChartDateBounds() {
  const currentDate = dayjs()
  const furthestPastDate = dayjs().subtract(2, 'years')
  const initialStartDate = dayjs().subtract(3, 'months')

  const [startDate, setStartDate] = useState<PickerValue>(initialStartDate)
  const [endDate, setEndDate] = useState<PickerValue>(currentDate)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate || startDate.isSameOrAfter(endDate)) return

    // TODO: update date state
  }

  return (
    <Box
      component="form"
      display="flex"
      justifyContent="space-evenly"
      marginTop={8}
      onSubmit={handleSubmit}
    >
      <DatePicker
        views={['month', 'year']}
        value={startDate}
        onChange={(newValue) => setStartDate(newValue)}
        disableFuture
        minDate={furthestPastDate}
        label="Start Date"
        slotProps={{
          textField: {
            required: true,
          },
        }}
      />

      <DatePicker
        views={['month', 'year']}
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
        disableFuture
        minDate={furthestPastDate}
        label="End Date"
        slotProps={{
          textField: {
            required: true,
          },
        }}
      />
    </Box>
  )
}
