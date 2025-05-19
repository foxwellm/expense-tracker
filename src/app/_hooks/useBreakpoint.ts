'use client'

import { useMediaQuery, useTheme } from '@mui/material'

export const useBreakpoint = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })
  return { isMobile }
}
