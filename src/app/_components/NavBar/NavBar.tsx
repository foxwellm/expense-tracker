import { AppBar, Box, Toolbar } from '@mui/material'
import { User } from '@supabase/supabase-js'

import { ChartPageButtons } from './ChartPageButtons'
import { PaletteModeSwitch } from './PaletteModeSwitch'
import { ProfileButton } from './ProfileButton'
import { Title } from './Title'

export function NavBar({ user }: { user: User | null }) {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar disableGutters sx={{ px: { zero: 0, sm: 2 } }}>
        <Box display="flex" flex={1}>
          <Title />
        </Box>
        <Box sx={{ display: { zero: 'none', sm: 'flex' } }}>
          <ChartPageButtons />
        </Box>
        <PaletteModeSwitch />
        <ProfileButton user={user} />
      </Toolbar>

      <Toolbar sx={{ display: { zero: 'flex', sm: 'none' } }}>
        <Box sx={{ width: '100%' }}>
          <ChartPageButtons />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
