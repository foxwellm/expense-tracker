import { Box } from '@mui/material'
import { ReactNode } from 'react'

export function ChartLayout({
  children,
  slider,
}: {
  children: ReactNode
  slider: ReactNode
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          zero: 'column',
          md: 'row',
        },
        marginY: 8,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          mx: 3,
          position: 'relative',
        }}
      >
        {slider}
      </Box>
    </Box>
  )
}
