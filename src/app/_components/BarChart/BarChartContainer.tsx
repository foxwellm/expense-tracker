'use client'

import { Box, Skeleton, Typography, useTheme } from '@mui/material'

import { useExpensesStore } from '@/store'

import { ErrorMessage } from '../ErrorMessage'
import { BarChart } from './BarChart'

export function BarChartContainer() {
  const { data, loading, error } = useExpensesStore()
  const theme = useTheme()

  return (
    <Box sx={{ aspectRatio: '16 / 9', marginY: 10 }}>
      {error ? (
        <ErrorMessage message={error?.message} />
      ) : loading ? (
        <Skeleton variant="rectangular" height="100%" />
      ) : !data?.categories ||
        !data?.monthYearDomain ||
        !data?.monthlyExpenses ? (
        <ErrorMessage message="Incomplete data received." />
      ) : !data.monthlyExpenses.length ? (
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
            Add a single expense, or add multiple random expenses to see the
            chart in action faster.
          </Typography>
        </Box>
      ) : (
        <BarChart {...data} />
      )}
    </Box>
  )
}
