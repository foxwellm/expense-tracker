'use client'

import { SnackbarProvider } from 'notistack'
import { PropsWithChildren } from 'react'

export function SnackbarProviderClient({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider dense maxSnack={3}>
      {children}
    </SnackbarProvider>
  )
}
