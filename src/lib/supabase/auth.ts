import { User } from '@supabase/supabase-js'

import { createBrowserSupabaseClient } from './client'

export const getAuthUser = async (): Promise<User | null> => {
  const supabase = createBrowserSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
