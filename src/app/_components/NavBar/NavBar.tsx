'use client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { User } from '@supabase/supabase-js'

import { useBreakpoint } from '@/app/_hooks'

import { ChartPageButtons } from './ChartPageButtons'
import { PaletteModeSwitch } from './PaletteModeSwitch'
import { ProfileButton } from './ProfileButton'
import { Title } from './Title'

export function NavBar({ user }: { user: User | null }) {
  const { isSmallTablet } = useBreakpoint()
  return (
    <AppBar position="sticky" color="default">
      <Toolbar disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
        <Box display={'flex'} flex={1}>
          <Title />
        </Box>
        {!isSmallTablet && <ChartPageButtons />}
        <PaletteModeSwitch />
        <ProfileButton user={user} />
      </Toolbar>
      {isSmallTablet && (
        <Toolbar>
          <Box sx={{ width: '100%' }}>
            <ChartPageButtons />
          </Box>
        </Toolbar>
      )}
    </AppBar>
  )
}
