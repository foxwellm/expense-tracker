'use client'

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
  const userExpenses = useExpensesStore((s) => s.userExpenses)
  const isRenderReady = useExpensesStore((s) => s.isRenderReady)
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
    return (
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          position: 'relative',
        }}
      >
        <svg
          width={700}
          height={700}
          viewBox={`0 0 ${700} ${700}`}
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
      <SunburstChart {...chartData} />
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
      {chartData?.children && !chartData.children?.length && (
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
