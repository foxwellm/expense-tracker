import { type EmailOtpType } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  // Can add next param in supabase email configuration
  // const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createServerSupabaseClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      redirect('/chart/bar?sidebar=open')
    }
  }

  redirect('/error')
}
