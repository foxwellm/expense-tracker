'use client'

import Box from '@mui/material/Box'
import { ReactNode } from 'react'

import { useBreakpoint } from '@/app/_hooks'

export function ChartLayout({
  children,
  slider,
}: {
  children: ReactNode
  slider: ReactNode
}) {
  const { isTablet } = useBreakpoint()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row',
          marginY: 8,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>

        <Box
          sx={{
            px: 3,
          }}
        >
          {slider}
        </Box>
      </Box>
    </>
  )
}
