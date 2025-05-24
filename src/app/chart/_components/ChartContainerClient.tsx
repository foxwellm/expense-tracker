'use client'

import Box from '@mui/material/Box'
import { ReactNode } from 'react'

import { useBreakpoint } from '@/app/_hooks'

export function ChartContainerClient({
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
          marginTop: 8,
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

        {!isTablet && (
          <Box
            sx={{
              px: 2,
            }}
          >
            {slider}
          </Box>
        )}
      </Box>

      {isTablet && <Box marginX={3}>{slider}</Box>}
    </>
  )
}
