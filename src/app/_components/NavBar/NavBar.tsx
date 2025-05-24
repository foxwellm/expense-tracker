'use client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { User } from '@supabase/supabase-js'

import { useBreakpoint } from '@/app/_hooks'

import { ChartPageTabs } from './ChartPageTabs'
import { PaletteModeSwitch } from './PaletteModeSwitch'
import { ProfileButton } from './ProfileButton'
import { Title } from './Title'

export function NavBar({ user }: { user: User | null }) {
  const { isMobile } = useBreakpoint()
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Box display={'flex'} flex={1}>
          <Title />
        </Box>
        {!isMobile && <ChartPageTabs />}
        <PaletteModeSwitch />
        <ProfileButton user={user} />
      </Toolbar>
      {isMobile && (
        <Toolbar>
          <Box sx={{ width: '100%' }}>
            <ChartPageTabs />
          </Box>
        </Toolbar>
      )}
    </AppBar>
  )
}
