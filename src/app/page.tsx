import { Container } from '@mui/material'

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
          <BarChartContainer />
        </Container>
      </SideDrawer>
    </>
  )
}
