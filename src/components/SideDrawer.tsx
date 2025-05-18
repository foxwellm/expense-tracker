'use client'

import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { ReactNode } from 'react'

import { drawerWidth, navBarHeight } from '@/lib/constants/dimensions'
import { useDrawerState } from '@/store'

import { AddExpenses } from './AddExpenses'

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

export function SideDrawer({ children }: { children: ReactNode }) {
  const { isDrawerOpen } = useDrawerState()

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
        <AddExpenses />
      </Drawer>
      <Main open={isDrawerOpen}>{children}</Main>
    </Box>
  )
}
