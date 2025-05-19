import { Container } from '@mui/material'
import { redirect } from 'next/navigation'

import { createServerSupabaseClient } from '@/lib/supabase'

import {
  ExpensesWrapper,
  SideDrawer,
  SideDrawerFab,
  VertBarChartContainer,
} from './_components'

export default async function RootPage() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <ExpensesWrapper>
      <SideDrawerFab />
      <SideDrawer>
        <Container>
          <VertBarChartContainer />
        </Container>
      </SideDrawer>
    </ExpensesWrapper>
  )
}
