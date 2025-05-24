'use client'

import { useMediaQuery, useTheme } from '@mui/material'

const headers = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const

type HeaderLevel = (typeof headers)[keyof typeof headers]

export const useBreakpoint = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true })
  const isSmallTablet = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  })
  const isTablet = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })

  const navHeight = isSmallTablet ? 56 : 64
  const logoDimension = isTablet ? 20 : 34

  let largeHeader: HeaderLevel
  let mediumHeader: HeaderLevel

  if (isMobile) {
    largeHeader = headers.h5
    mediumHeader = headers.h4
  } else if (isTablet) {
    largeHeader = headers.h3
    mediumHeader = headers.h4
  } else {
    largeHeader = headers.h1
    mediumHeader = headers.h3
  }

  return {
    isMobile,
    isSmallTablet,
    isTablet,
    navHeight,
    largeHeader,
    mediumHeader,
    logoDimension,
  }
}
