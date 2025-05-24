import Container from '@mui/material/Container'
import { ReactNode } from 'react'

import { ExpensesHydrator, SideDrawer, SideDrawerFab } from './_components'

export default function ChartLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ExpensesHydrator />
      <SideDrawerFab />
      <SideDrawer>
        <Container>{children}</Container>
      </SideDrawer>
    </>
  )
}
