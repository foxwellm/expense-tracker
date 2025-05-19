'use client'

import { User } from '@supabase/supabase-js'

import { useAuthStore } from '@/store'

export function AuthCollector({ user }: { user: User | null }) {
  const setUser = useAuthStore((s) => s.setUser)

  setUser(user)

  return null
}
