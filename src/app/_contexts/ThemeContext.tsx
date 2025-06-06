'use client'

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProviderContext({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('dark')
  const value = useMemo(() => ({ mode, setMode }), [mode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used inside ThemeProviderContext')
  }
  return context
}
