import '@mui/material/styles'
import '@mui/material/Typography'

import React from 'react'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    largeHeader: React.CSSProperties
    mediumHeader: React.CSSProperties
    bodyText: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    largeHeader?: React.CSSProperties
    mediumHeader?: React.CSSProperties
    bodyText?: React.CSSProperties
  }

  interface BreakpointOverrides {
    xxs: true
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
    xxxl: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    largeHeader: true
    mediumHeader: true
    bodyText: true
  }
}
