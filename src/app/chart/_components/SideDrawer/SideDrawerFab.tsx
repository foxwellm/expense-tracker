'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

import { drawerWidth, navHeight } from '@/lib/constants/dimensions'
import { useDrawerState } from '@/store'

export function SideDrawerFab() {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawerState()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: {
          zero: `calc(${navHeight.mobile * 2 + 4}px)`,
          sm: `${navHeight.notMobile + 4}px`,
        },
        marginTop: 1,
        marginLeft: 1.5,
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
