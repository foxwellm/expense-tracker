// NOTE: Prevents Flash of Unstyled Content (FOUC)
// https://mui.com/material-ui/integrations/nextjs/#app-router
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import {
  ApolloProviderClient,
  DatePickerProvider,
  SnackbarProviderClient,
  ThemeProviderClient,
} from '@/app/_providers'

import { NavBarContainer } from './_components'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Foxwell Expense Tracker',
  description: 'Demo Expense Tracking App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ApolloProviderClient>
          <AppRouterCacheProvider>
            <ThemeProviderClient>
              <SnackbarProviderClient>
                <DatePickerProvider>
                  <NavBarContainer />
                  {children}
                </DatePickerProvider>
              </SnackbarProviderClient>
            </ThemeProviderClient>
          </AppRouterCacheProvider>
        </ApolloProviderClient>
        {/* NOTE: Vercel scripts can be blocked by ad-blockers */}
        <Analytics />
      </body>
    </html>
  )
}
