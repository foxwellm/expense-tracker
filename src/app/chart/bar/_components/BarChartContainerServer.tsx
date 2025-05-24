import { ChartContainerClient } from '../../_components'
import { DateRangeSliderContainer } from '../../_components/DateRangeSlider'
import { BarChartContainer } from './BarChart'

export function BarChartContainerServer() {
  // NOTE: DateRangeSliderContainer needs to be imported server side
  return (
    <ChartContainerClient slider={<DateRangeSliderContainer />}>
      <BarChartContainer />
    </ChartContainerClient>
  )
}
