"use client"

import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { ReactNode, useMemo } from "react"

import { ThemeProviderContext, useThemeMode } from "@/contexts"
import { getTheme } from "@/theme"

function ThemeInner({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode()
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export function ThemeProviderClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProviderContext>
      {/* NOTE: ThemeInner used so that useThemeMode can be inside ThemeProviderContext */}
      <ThemeInner>{children}</ThemeInner>
    </ThemeProviderContext>
  )
}
