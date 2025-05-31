'use client'

import { SnackbarProvider } from 'notistack'
import { PropsWithChildren } from 'react'

export function SnackbarProviderClient({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider
      dense
      maxSnack={3}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {children}
    </SnackbarProvider>
  )
}
