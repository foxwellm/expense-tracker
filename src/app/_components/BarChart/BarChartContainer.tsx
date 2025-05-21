'use client'

import { Box, Skeleton, Typography, useTheme } from '@mui/material'

import { useExpensesStore } from '@/store'

import { ErrorMessage } from '../ErrorMessage'
import { BarChart } from './BarChart'
import { combineMonthlyExpenses, getMonthYearDomain } from './utils/chartData'

export function BarChartContainer() {
  const theme = useTheme()
  const { userExpenses, loading, error, startDateBound, endDateBound } =
    useExpensesStore()

  if (error || !userExpenses) return <ErrorMessage message={error?.message} />

  if (loading) return <Skeleton variant="rectangular" height="100%" />

  if (!userExpenses.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          border: '1px dashed',
          borderColor: theme.palette.info.main,
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" color="info">
          Add a single expense, or add multiple random expenses to see the chart
          in action faster.
        </Typography>
      </Box>
    )
  }

  const monthYearDomain = getMonthYearDomain(startDateBound, endDateBound)

  if (!monthYearDomain) return <ErrorMessage message="Incorrect dates." />

  const chartData = combineMonthlyExpenses(userExpenses)

  if (!chartData?.categories || !chartData?.monthlyExpenses) {
    return <ErrorMessage message="Incomplete data received." />
  }

  return <BarChart {...chartData} monthYearDomain={monthYearDomain} />
}
