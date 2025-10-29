'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

import { getTheme } from '@/theme'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used inside ThemeProviderContext')
  }
  return context
}

function ThemeInner({ children }: PropsWithChildren) {
  const { mode } = useThemeMode()
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export function ThemeProviderClient({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('dark')
  const value = useMemo(() => ({ mode, setMode }), [mode])

  return (
    <ThemeContext.Provider value={value}>
      {/* NOTE: ThemeInner used so that useThemeMode can be inside ThemeProviderContext */}
      <ThemeInner>{children}</ThemeInner>
    </ThemeContext.Provider>
  )
}
