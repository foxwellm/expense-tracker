import { NextRequest, NextResponse } from 'next/server'

import { createServerSupabaseClient } from '@/utils/supabase'

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { date, expense, cost } = body

  if (!date || !expense || typeof cost !== 'number') {
    return NextResponse.json(
      { error: 'Missing or invalid fields.' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('expenses')
    .insert([
      {
        user_id: user.id,
        date,
        expense,
        cost,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
