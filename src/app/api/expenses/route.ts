import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { expenseSchema, expensesSchema } from '@/lib/schemas/expense'
import { createServerSupabaseClient } from '@/utils/supabase'
// import sanitizeHtml from 'sanitize-html'

const sanitizeInput = (input: z.infer<typeof expenseSchema>) => {
  return {
    ...input,
    // name: sanitizeHtml(input.name, {
    //   allowedTags: [],
    //   allowedAttributes: {},
    // }),
  }
}

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

  let parsedExpenses
  try {
    parsedExpenses = expensesSchema.parse(body)
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid request data', details: err },
      { status: 400 }
    )
  }

  const cleanedExpenses = parsedExpenses.map((expense) => ({
    ...sanitizeInput(expense),
    user_id: user.id,
  }))

  const { data, error } = await supabase
    .from('expenses')
    .insert(cleanedExpenses)
    .select()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
