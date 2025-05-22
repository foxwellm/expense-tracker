import dayjs, { Dayjs } from 'dayjs'

import { expenseDisplayMonths } from '../constants/expenses'

export function getRandomDateBetween(
  startDate: string,
  endDate: string
): string {
  const startDayjsDate = dayjs(startDate)
  const endDayjsDate = dayjs(endDate)
  const startUnix = startDayjsDate.unix()
  const endUnix = endDayjsDate.unix()
  const randomUnix =
    Math.floor(Math.random() * (endUnix - startUnix + 1)) + startUnix
  return dayjs.unix(randomUnix).format('YYYY-MM-DD')
}

// yyyy-mm-dd || Dayjs
export function getMonthYear(fullDate: string | Dayjs) {
  const date = dayjs(fullDate)
  const monthValue = date.month()
  const month = expenseDisplayMonths[monthValue]
  const year = date.year().toString().slice(-2)
  return `${month} ${year}`
}
