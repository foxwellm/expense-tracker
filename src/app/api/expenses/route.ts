import { NextRequest, NextResponse } from 'next/server'

import { expenseDisplayMonths } from '@/lib/constants/expenses'
// import sanitizeHtml from 'sanitize-html'
import mockExpenses from '@/lib/constants/mockExpenses.json'
import { expensesSchema } from '@/lib/schemas/expense'
import { createServerSupabaseClient } from '@/lib/supabase'
import { Expense } from '@/types/expense'

const sanitizeExpense = (expense: Expense) => {
  return {
    ...expense,
    // name: sanitizeHtml(expense.name, {
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

  const cleanedExpenses = parsedExpenses.map((expense: Expense) => ({
    ...sanitizeExpense(expense),
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

function getMonthYear(stringDate: string) {
  const date = new Date(stringDate)
  const monthValue = date.getMonth()
  const month = expenseDisplayMonths[monthValue]
  const year = date.getFullYear()
  return `${month} ${year}`
}

function transformExpenses(expenses: Expense[]) {
  const transformedExpenses = expenses.map((exp) => {
    const { cost, expense, date } = exp
    return {
      cost,
      expense,
      monthYear: getMonthYear(date),
    }
  })
  return transformedExpenses
}

export async function GET() {
  // export async function GET(request: NextRequest) {
  // const supabase = await createServerSupabaseClient();

  // const {
  //   data: { user },
  //   error: authError,
  // } = await supabase.auth.getUser();

  // if (authError || !user) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  // TODO: query param date range
  // const url = new URL(request.url);
  // const transform = url.searchParams.get('transform') === 'true';
  // const { data: rawExpenses, error } = await supabase
  //   .from('expenses')
  //   .select('date, expense, cost')
  //   .eq('user_id', user.id);

  // if (error) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  // const transformedExpenses = transformExpenses(rawExpenses)
  const rawExpenses = mockExpenses as Expense[]
  const transformedExpenses = transformExpenses(rawExpenses)

  return NextResponse.json({
    rawExpenses,
    transformedExpenses,
  })
}
