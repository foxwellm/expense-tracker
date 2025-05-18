'use client'

import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { PaletteModeSwitch } from '@/components'
import { useDrawerState } from '@/store'

export function NavBar() {
  const { openDrawer } = useDrawerState()
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'black',
      }}
    >
      <Toolbar>
        <IconButton
          onClick={openDrawer}
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Placeholder
        </Typography>
        <PaletteModeSwitch />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}
