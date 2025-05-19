import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import { getAuthUser } from '@/lib/supabase/auth'

import { HomeButton } from './HomeButton'
import { PaletteModeSwitch } from './PaletteModeSwitch'
import { ProfileButton } from './ProfileButton'
import { Title } from './Title'

export async function NavBar() {
  const { user } = await getAuthUser()
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ marginX: 4 }}>
        <HomeButton />
        <Title />
        <PaletteModeSwitch />
        <ProfileButton user={user} />
      </Toolbar>
    </AppBar>
  )
}
