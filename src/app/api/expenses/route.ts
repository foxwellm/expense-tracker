import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { createServerSupabaseClient } from '@/utils/supabase'
// import sanitizeHtml from 'sanitize-html'

// NOTE: Removing an expenseCategory must be handles in the database by renaming the category or removing those rows
const expenseCategories = ['Clothing', 'Food', 'Fuel', 'Entertainment'] as const

const expenseSchema = z.object({
  date: z.string().date(), // yyyy-mm-dd
  expense: z.enum(expenseCategories),
  cost: z.number().positive(),
  // name: z.string().max(100),
})

const expensesSchema = z.array(expenseSchema)

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
