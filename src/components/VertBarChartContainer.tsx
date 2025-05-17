'use client'

import { Box, Skeleton } from '@mui/material'

import { useExpensesStore } from '@/store'

import { ErrorMessage } from './ErrorMessage'
import { VertBarChart } from './VertBarChart'

export function VertBarChartContainer() {
  const { data, loading, error } = useExpensesStore()
  return (
    <Box sx={{ aspectRatio: '16 / 9', marginY: 6 }}>
      {error ? (
        <ErrorMessage message={error?.message} />
      ) : loading ? (
        <Skeleton variant="rectangular" height="100%" />
      ) : !data?.categories ||
        !data?.monthYearDomain ||
        !data?.monthlyExpenses ? (
        <ErrorMessage message="Incomplete data received." />
      ) : (
        <VertBarChart {...data} />
      )}
    </Box>
  )
}
