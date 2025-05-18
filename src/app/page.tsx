import { Container } from '@mui/material'

import { SideDrawer, SideDrawerFab, VertBarChartContainer } from '@/components'
import { ExpensesWrapper } from '@/components/ExpensesWrapper'
import { NavBar } from '@/components/NavBar'

export default function RootPage() {
  return (
    <>
      <NavBar />
      <ExpensesWrapper>
        <SideDrawerFab />
        <SideDrawer>
          <Container>
            <VertBarChartContainer />
          </Container>
        </SideDrawer>
      </ExpensesWrapper>
    </>
  )
}
