import dayjs, { Dayjs } from 'dayjs'

import { getMonthYear } from '@/lib/utils/date'

export function getDateRangeSliderMarks() {
  let dateRangeSliderMarks: { date: Dayjs; label: string; value: number }[] = []
  // setting dates to 1st of the month to protect against going to next month from 31st and Feb
  let currentDate = dayjs().startOf('month')
  // months go 12 months - 11 to 0
  let currentMonth = 11

  while (currentMonth >= 0) {
    dateRangeSliderMarks = [
      {
        value: currentMonth,
        date: currentDate,
        label: getMonthYear(currentDate),
      },
      ...dateRangeSliderMarks,
    ]
    currentDate = currentDate.subtract(1, 'month')
    currentMonth--
  }
  return dateRangeSliderMarks
}
