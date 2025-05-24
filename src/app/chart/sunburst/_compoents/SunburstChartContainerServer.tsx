import { ChartContainerClient } from '../../_components'
import { DateRangeSliderContainer } from '../../_components/DateRangeSlider'
import { SunburstChartContainer } from './SunburstChart'

export function SunburstChartContainerServer() {
  // NOTE: DateRangeSliderContainer needs to be imported server side
  return (
    <ChartContainerClient slider={<DateRangeSliderContainer />}>
      <SunburstChartContainer />
    </ChartContainerClient>
  )
}
