import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import { getAuthUser } from '@/lib/supabase/auth'

import ChartPageTabs from './ChartPageTabs'
import { HomeButton } from './HomeButton'
import { PaletteModeSwitch } from './PaletteModeSwitch'
import { ProfileButton } from './ProfileButton'
import { Title } from './Title'

export async function NavBar() {
  const { user } = await getAuthUser()
  return (
    <AppBar position="sticky" color="default">
      <Toolbar sx={{ marginX: 4 }}>
        <HomeButton />
        <Title />
        <ChartPageTabs />
        <PaletteModeSwitch />
        <ProfileButton user={user} />
      </Toolbar>
    </AppBar>
  )
}
