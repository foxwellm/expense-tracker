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
import { CombinedMonthlyExpenses } from '@/types/expense'

// import { ErrorMessage } from '../ErrorMessage'
import { BarChart } from './BarChart'
import { combineMonthlyExpenses, getMonthYearDomain } from './utils/chartData'

export function BarChartContainer() {
  const userExpenses = useExpensesStore((s) => s.userExpenses)
  const startDateBound = useExpensesStore((s) => s.startDateBound)
  const endDateBound = useExpensesStore((s) => s.endDateBound)
  const isRenderReady = useExpensesStore((s) => s.isRenderReady)
  const error = useExpensesStore((s) => s.error)

  const [chartData, setChartData] = useState<
    (CombinedMonthlyExpenses & { monthYearDomain: string[] }) | undefined
  >(undefined)

  useEffect(() => {
    if (!userExpenses || !isRenderReady) return
    const newChartData = combineMonthlyExpenses(userExpenses)
    const monthYearDomain = getMonthYearDomain(startDateBound, endDateBound)

    if (!monthYearDomain) return // TODO: Set local error

    setChartData({ ...newChartData, monthYearDomain })
  }, [userExpenses, startDateBound, endDateBound, isRenderReady])

  if (error) return <ErrorMessage message={error?.message} />

  // Initial Loading
  if (!chartData) return <Loading width={1800} height={1000} />

  return (
    <Box sx={{ position: 'relative' }}>
      <BarChart {...chartData} />
      {!isRenderReady && <ChartLoadingProgress />}
      {!chartData.monthlyExpenses.length && <NoExxpensesInfo />}
    </Box>
  )
}
