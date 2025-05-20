import { Container } from '@mui/material'

import {
  BarChartContainer,
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
          <BarChartContainer />
        </Container>
      </SideDrawer>
    </>
  )
}
