import { Container } from '@mui/material'
import { redirect } from 'next/navigation'

import { SideDrawer, SideDrawerFab, VertBarChartContainer } from '@/components'
import { ExpensesWrapper } from '@/components/ExpensesWrapper'
import { createServerSupabaseClient } from '@/lib/supabase'

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
