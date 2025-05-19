'use server'

import { createServerSupabaseClient } from '@/lib/supabase'

import { AuthCollector } from './AuthCollector'

export async function AuthHydrator() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <AuthCollector user={user} />
}
