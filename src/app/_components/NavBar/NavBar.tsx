import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { getAuthUser } from '@/lib/supabase/auth'

import { HomeButton } from './HomeButton'
import { PaletteModeSwitch } from './PaletteModeSwitch'
import { ProfileButton } from './ProfileButton'

export async function NavBar() {
  const { user } = await getAuthUser()
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ marginX: 4 }}>
        <HomeButton />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Foxwell Expense Tracker
        </Typography>
        <PaletteModeSwitch />
        <ProfileButton user={user} />
      </Toolbar>
    </AppBar>
  )
}
