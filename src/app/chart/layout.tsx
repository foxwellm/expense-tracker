import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ReactNode } from 'react'

import {
  DateRangeSliderContainer,
  ExpensesHydrator,
  SideDrawer,
  SideDrawerFab,
} from '../_components'

export default function ChartLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ExpensesHydrator />
      <SideDrawerFab />
      <SideDrawer>
        <Container>
          <Box
            sx={{ aspectRatio: '16 / 9', marginTop: 4 }}
            display="flex"
            alignItems="center"
          >
            {children}
            <Box height="100%" py={4}>
              <DateRangeSliderContainer />
            </Box>
          </Box>
        </Container>
      </SideDrawer>
    </>
  )
}
