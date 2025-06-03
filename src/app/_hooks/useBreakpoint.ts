'use client'

import { useMediaQuery, useTheme } from '@mui/material'

export const useBreakpoint = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true })
  const isSmallTablet = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  })
  const isTablet = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
  const isDesktop = useMediaQuery(theme.breakpoints.down('xl'), {
    noSsr: true,
  })
  const isLDesktop = useMediaQuery(theme.breakpoints.down('xxl'), {
    noSsr: true,
  })
  const is3XLDesktop = useMediaQuery(theme.breakpoints.down('xxxl'), {
    noSsr: true,
  })

  const navHeight = isSmallTablet ? 56 : 64
  const logoDimension = isTablet ? 20 : 34

  let chartWidth
  let chartHeight

  if (isDesktop) {
    chartWidth = 1800
    chartHeight = 800
  } else if (isLDesktop) {
    chartWidth = 1800
    chartHeight = 1000
  } else if (is3XLDesktop) {
    chartWidth = 1800
    chartHeight = 1100
  } else {
    chartWidth = 1800
    chartHeight = 1500
  }

  return {
    isMobile,
    isSmallTablet,
    isTablet,
    navHeight,
    logoDimension,
    chartWidth,
    chartHeight,
  }
}
