import { getAuthUser } from '@/lib/supabase/auth'

import { NavBar } from './NavBar'

export async function NavBarContainer() {
  const { user } = await getAuthUser()
  return <NavBar user={user} />
}
