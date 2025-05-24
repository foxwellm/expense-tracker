'use client'

import { styled } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { PropsWithChildren } from 'react'

import { useBreakpoint } from '@/app/_hooks'
import { drawerWidth } from '@/lib/constants/dimensions'
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
  const { isDrawerOpen, closeDrawer } = useDrawerState()
  const { isMobile, navHeight } = useBreakpoint()

  return (
    <Box display={'flex'}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: isMobile ? navHeight * 2 + 8 : navHeight + 8,
            borderTopRightRadius: 8,
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <TabManager />
      </Drawer>
      {isMobile && (
        <Backdrop
          open={isDrawerOpen}
          onClick={closeDrawer}
          sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
        />
      )}
      <Main open={!isMobile && isDrawerOpen}>{children}</Main>
    </Box>
  )
}
