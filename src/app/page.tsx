import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import {
  BarChartContainer,
  ChartDateBounds,
  ExpensesHydrator,
  SideDrawer,
  SideDrawerFab,
} from './_components'

export default async function RootPage() {
  return (
    <>
      <ExpensesHydrator />
      <SideDrawerFab />
      <SideDrawer>
        <Container>
          <ChartDateBounds />
          <Box sx={{ aspectRatio: '16 / 9', marginY: 4 }}>
            <BarChartContainer />
          </Box>
        </Container>
      </SideDrawer>
    </>
  )
}
