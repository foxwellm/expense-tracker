'use client'

import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { PropsWithChildren } from 'react'

import { useBreakpoint } from '@/app/_hooks'
import { drawerWidth, navBarHeight } from '@/lib/constants/dimensions'
import { useDrawerState } from '@/store'

import { TabManager } from './TabManager'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}))

export function SideDrawer({ children }: PropsWithChildren) {
  const { isDrawerOpen } = useDrawerState()
  const { isMobile } = useBreakpoint()

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: navBarHeight,
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <TabManager />
      </Drawer>
      <Main open={!isMobile && isDrawerOpen}>{children}</Main>
    </Box>
  )
}
