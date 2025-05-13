'use client'

import { Box, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'

import { CombinedMonthlyExpenses } from '@/types/expense'

import { VertBarChart } from './VertBarChart'

export function VertBarChartContainer() {
  const [combinedExpenses, setCombinedExpenses] =
    useState<CombinedMonthlyExpenses>()
  useEffect(() => {
    const getMonthlyExpenses = async () => {
      const res = await fetch('/api/expenses')
      const { combinedMonthyExpenses } = await res.json()
      setCombinedExpenses(combinedMonthyExpenses)
    }
    getMonthlyExpenses()
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
      }}
    >
      {!combinedExpenses ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      ) : (
        <VertBarChart
          monthlyExpenses={combinedExpenses.monthlyExpenses}
          categories={combinedExpenses.categories}
          monthYearDomain={combinedExpenses.monthYearDomain}
        />
      )}
    </Box>
  )
}
