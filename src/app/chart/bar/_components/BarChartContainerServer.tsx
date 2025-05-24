import {
  ChartContainerClient,
  DateRangeSliderContainer,
} from '../../_components'
import { BarChartContainer } from './BarChart'

export function BarChartContainerServer() {
  // NOTE: DateRangeSliderContainer needs to be imported server side
  return (
    <ChartContainerClient slider={<DateRangeSliderContainer />}>
      <BarChartContainer />
    </ChartContainerClient>
  )
}
