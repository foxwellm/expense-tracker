'use client'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import { ErrorMessage } from '@/app/_components/ErrorMessage'
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
  if (!chartData)
    return (
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          position: 'relative',
        }}
      >
        <svg
          width={1800}
          height={1000}
          viewBox={`0 0 ${1800} ${1000}`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 4,
          }}
        />
      </Box>
    )

  return (
    <Box sx={{ position: 'relative' }}>
      <BarChart {...chartData} />
      {!isRenderReady && (
        <LinearProgress
          sx={{
            position: 'absolute',
            width: '93%',
            bottom: 0,
            right: 0,
          }}
        />
      )}
      {!chartData.monthlyExpenses.length && (
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '45%',
            transform: 'translate(-35%, -50%)',
            p: 2,
            border: '1px dashed',
            borderColor: (theme) => theme.palette.info.main,
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="info">
            You have no Expenses in this date range. Add new Expenses, or change
            date range.
          </Typography>
        </Box>
      )}
    </Box>
  )
}
