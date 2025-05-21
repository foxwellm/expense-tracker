'use client'

import { Box, Skeleton, Typography, useTheme } from '@mui/material'

import { useExpensesStore } from '@/store'

import { ErrorMessage } from '../ErrorMessage'
import { SunburstChart } from './SunburstChart'
import { sunburstNode } from './utils/chartData'

export function SunburstChartContainer() {
  const theme = useTheme()
  const { userExpenses, loading, error } = useExpensesStore()

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

  const chartData = sunburstNode(userExpenses)

  return <SunburstChart {...chartData} />
}
