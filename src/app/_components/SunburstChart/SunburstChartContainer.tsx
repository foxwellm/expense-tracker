'use client'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import { useExpensesStore } from '@/store'

import { ErrorMessage } from '../ErrorMessage'
import { SunburstChart } from './SunburstChart'
import { sunburstNode } from './utils/chartData'

export function SunburstChartContainer() {
  const theme = useTheme()
  const userExpenses = useExpensesStore((s) => s.userExpenses)
  const isRenderReady = useExpensesStore((s) => s.isRenderReady)
  const loading = useExpensesStore((s) => s.loading)
  const error = useExpensesStore((s) => s.error)

  interface SunburstNode {
    name: string
    value?: number
    children?: SunburstNode[]
  }

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
  if (!chartData)
    return <Skeleton variant="rectangular" height="100%" width={'100%'} />

  return (
    <Box sx={{ position: 'relative' }}>
      <SunburstChart {...chartData} />
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            width: '93%',
            bottom: 0,
            right: 0,
          }}
        />
      )}
      {chartData?.children && !chartData.children?.length && (
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '45%',
            transform: 'translate(-35%, -50%)',
            p: 2,
            border: '1px dashed',
            borderColor: theme.palette.info.main,
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
