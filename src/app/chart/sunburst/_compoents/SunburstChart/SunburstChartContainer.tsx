'use client'

import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

import { ErrorMessage } from '@/app/_components/ErrorMessage'
import {
  ChartLoadingProgress,
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
  if (!chartData) return <Loading width={700} height={700} />

  return (
    <Box sx={{ position: 'relative' }}>
      <SunburstChart {...chartData} />
      {!isRenderReady && <ChartLoadingProgress />}
      {chartData?.children && !chartData.children?.length && (
        <NoExxpensesInfo />
      )}
    </Box>
  )
}
