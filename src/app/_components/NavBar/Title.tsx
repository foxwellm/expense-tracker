'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useBreakpoint } from '@/app/_hooks/useBreakpoint'

export function Title() {
  const { isMobile } = useBreakpoint()

  if (isMobile) {
    return <Box sx={{ flexGrow: 1 }}></Box>
  }

  return (
    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      Expense Tracker
    </Typography>
  )
}
