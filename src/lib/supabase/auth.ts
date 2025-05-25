'use server'

import { AuthError, User } from '@supabase/supabase-js'

import { createServerSupabaseClient } from './server'

export const getAuthUser = async (): Promise<{
  user: User | null
  error: AuthError | null
}> => {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.auth.getUser()

  return { user: data?.user, error }
}
