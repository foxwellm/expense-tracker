'use client'

import { useQuery } from '@apollo/client'
import { Box, Skeleton } from '@mui/material'

import { GET_COMBINED_EXPENSES } from '@/lib/graphql/queries'

import { ErrorMessage } from './ErrorMessage'
import { VertBarChart } from './VertBarChart'

export function VertBarChartContainer() {
  const { data, loading, error } = useQuery(GET_COMBINED_EXPENSES)

  return (
    <Box sx={{ aspectRatio: '16 / 9', marginY: 6 }}>
      {error ? (
        <ErrorMessage message={error?.message} />
      ) : loading ? (
        <Skeleton variant="rectangular" height="100%" />
      ) : !data?.combinedMonthlyExpenses?.monthlyExpenses ||
        !data?.combinedMonthlyExpenses?.categories ||
        !data?.combinedMonthlyExpenses?.monthYearDomain ? (
        <ErrorMessage message="Incomplete data received." />
      ) : (
        <VertBarChart
          monthlyExpenses={data.combinedMonthlyExpenses.monthlyExpenses}
          categories={data.combinedMonthlyExpenses.categories}
          monthYearDomain={data.combinedMonthlyExpenses.monthYearDomain}
        />
      )}
    </Box>
  )
}
