import {
  ChartContainerClient,
  DateRangeSliderContainer,
} from '../../_components'
import { SunburstChartContainer } from './SunburstChart'

export function SunburstChartContainerServer() {
  // NOTE: DateRangeSliderContainer needs to be imported server side
  return (
    <ChartContainerClient slider={<DateRangeSliderContainer />}>
      <SunburstChartContainer />
    </ChartContainerClient>
  )
}
