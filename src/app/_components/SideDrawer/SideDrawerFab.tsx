'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

import { drawerWidth, navBarHeight } from '@/lib/constants/dimensions'
import { useDrawerState } from '@/store'

export function SideDrawerFab() {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawerState()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: navBarHeight,
        marginTop: 1,
        marginLeft: 2,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transform: isDrawerOpen
          ? `translateX(${drawerWidth}px)`
          : 'translateX(0)',
        transition: 'transform 0.4s ease-out',
      }}
    >
      <Fab
        onClick={isDrawerOpen ? closeDrawer : openDrawer}
        color="primary"
        size="small"
        aria-label={isDrawerOpen ? 'close side drawer' : 'open side drawer'}
        disableRipple
        sx={{
          color: 'black',
          transition: 'color 0.4s linear, transform 0.4s linear',
          transform: isDrawerOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
