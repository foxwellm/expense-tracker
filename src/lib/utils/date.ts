import dayjs from 'dayjs'

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
