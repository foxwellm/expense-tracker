import { redirect } from 'next/navigation'

import { createServerSupabaseClient } from '@/utils/supabase'

export default async function PrivatePage() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}
