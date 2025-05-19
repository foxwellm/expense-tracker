import { Container } from '@mui/material'
import { redirect } from 'next/navigation'

import { getAuthUser } from '@/lib/supabase/auth'

import {
  ExpensesHydrator,
  SideDrawer,
  SideDrawerFab,
  VertBarChartContainer,
} from './_components'

export default async function RootPage() {
  const { user, error } = await getAuthUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <>
      <ExpensesHydrator />
      <SideDrawerFab />
      <SideDrawer>
        <Container>
          <VertBarChartContainer />
        </Container>
      </SideDrawer>
    </>
  )
}
