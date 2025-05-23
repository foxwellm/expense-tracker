import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import { getAuthUser } from '@/lib/supabase/auth'

import ChartPageTabs from './ChartPageTabs'
import { PaletteModeSwitch } from './PaletteModeSwitch'
import { ProfileButton } from './ProfileButton'
import { Title } from './Title'

export async function NavBar() {
  const { user } = await getAuthUser()
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Box display={'flex'} flex={1}>
          <Title />
        </Box>
        <ChartPageTabs />
        <PaletteModeSwitch />
        <ProfileButton user={user} />
      </Toolbar>
    </AppBar>
  )
}
