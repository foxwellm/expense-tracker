'use client'

import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { PropsWithChildren } from 'react'

import { drawerWidth, navHeight } from '@/lib/constants/dimensions'
import { useDrawerState } from '@/store'

import { TabManager } from './TabManager'

export function SideDrawer({ children }: PropsWithChildren) {
  const { isDrawerOpen, closeDrawer } = useDrawerState()

  return (
    <Box display="flex">
      <Drawer
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            height: {
              xxs: `calc(100vh - ${navHeight.mobile * 2 + 8}px)`,
              sm: `calc(100vh - ${navHeight.notMobile + 8}px)`,
            },
            width: drawerWidth,
            boxSizing: 'border-box',
            top: {
              xxs: navHeight.mobile * 2 + 8,
              sm: navHeight.notMobile + 8,
            },
            borderTopRightRadius: 8,
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <TabManager />
      </Drawer>

      <Backdrop
        open={isDrawerOpen}
        onClick={closeDrawer}
        sx={{
          display: { xxs: 'block', sm: 'none' },
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: isDrawerOpen
                ? theme.transitions.easing.easeOut
                : theme.transitions.easing.sharp,
              duration: isDrawerOpen
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
          marginLeft: {
            xxs: `-${drawerWidth}px`,
            sm: isDrawerOpen ? 0 : `-${drawerWidth}px`,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
