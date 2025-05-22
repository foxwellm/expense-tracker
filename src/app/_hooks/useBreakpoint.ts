'use client'

import { useMediaQuery, useTheme } from '@mui/material'

export const useBreakpoint = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })
  const isTablet = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })

  return { isMobile, isTablet, navHeight: isMobile ? 56 : 64 }
}
