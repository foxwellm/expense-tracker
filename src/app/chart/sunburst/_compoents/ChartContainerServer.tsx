import {
  DateRangeSliderContainer,
  SunburstChartContainer,
} from '@/app/_components'

import ChartContainerClient from '../../_components/ChartContainerClient'

export function ChartContainerServer() {
  // NOTE: DateRangeSliderContainer needs to be imported server side
  return (
    <ChartContainerClient slider={<DateRangeSliderContainer />}>
      <SunburstChartContainer />
    </ChartContainerClient>
  )
}
