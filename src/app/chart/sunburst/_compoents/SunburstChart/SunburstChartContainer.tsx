'use client'

import { useEffect, useState } from 'react'

import { ErrorMessage } from '@/app/_components'
import { useBreakpoint } from '@/app/_hooks'
import {
  ChartLayout,
  ChartLoadingProgress,
  DateRangeSliderContainer,
  Loading,
  NoExxpensesInfo,
} from '@/app/chart/_components'
import { useExpensesStore } from '@/store'

import { SunburstNode } from '../../_types'
import { SunburstChart } from './SunburstChart'
import { sunburstNode } from './utils/chartData'

export function SunburstChartContainer() {
  const userExpenses = useExpensesStore((s) => s.userExpenses)
  const isRenderReady = useExpensesStore((s) => s.isRenderReady)
  const error = useExpensesStore((s) => s.error)
  const { chartWidth, chartHeight } = useBreakpoint()

  const [chartData, setChartData] = useState<SunburstNode | undefined>(
    undefined
  )

  useEffect(() => {
    if (!userExpenses || !isRenderReady) return

    const newChartData = sunburstNode(userExpenses)

    setChartData(newChartData)
  }, [userExpenses, isRenderReady])

  if (error) return <ErrorMessage message={error?.message} />

  // Initial Loading
  if (!chartData) return <Loading width={chartWidth} height={chartHeight} />

  return (
    <ChartLayout slider={<DateRangeSliderContainer />}>
      <SunburstChart
        sunburstNode={chartData}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
      />
      {!isRenderReady && <ChartLoadingProgress />}
      {chartData?.children && !chartData.children?.length && (
        <NoExxpensesInfo />
      )}
    </ChartLayout>
  )
}
