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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })
  const isTablet = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })

  const navHeight = isMobile ? 56 : 64
  const largeHeader: HeaderLevel = isMobile
    ? headers.h5
    : isTablet
      ? headers.h2
      : headers.h1
  const mediumHeader: HeaderLevel = isMobile
    ? headers.h6
    : isTablet
      ? headers.h4
      : headers.h3

  return { isMobile, isTablet, navHeight, largeHeader, mediumHeader }
}
