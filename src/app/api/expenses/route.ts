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

function getMonthYear(stringDate: string | Date) {
  const date = new Date(stringDate)
  const monthValue = date.getMonth()
  const month = expenseDisplayMonths[monthValue]
  const year = date.getFullYear().toString().slice(-2)
  return `${month} ${year}`
}

function getMonthYearDomain(startDate: string, endDate: string) {
  let monthYearDomain: string[] = []
  const stopDateObj = new Date(endDate)
  stopDateObj.setMonth(stopDateObj.getMonth() + 1)

  const startDateObj = new Date(startDate)

  let whileCount = 0
  while (startDateObj < stopDateObj && whileCount < 12) {
    monthYearDomain = [...monthYearDomain, getMonthYear(startDateObj)]
    startDateObj.setMonth(startDateObj.getMonth() + 1)
    whileCount++
  }
  return monthYearDomain
}

function combineMonthlyExpenses(expenses: Expense[]) {
  const groupedData: Record<string, { [key: string]: number }> = {}
  const categories = new Set()

  let expenseStartDate
  let expenseEndDate

  expenses.forEach(({ date, category, cost_in_cents }, i) => {
    if (i === 0) {
      expenseEndDate = date
    }
    if (i === expenses.length - 1) {
      expenseStartDate = date
    }
    const monthYear = getMonthYear(date)

    if (!groupedData[monthYear]) {
      groupedData[monthYear] = {}
    }

    // NOTE: category intentionaly left in Title Case to let d3 map over and avoid type conflicts
    if (groupedData[monthYear][category]) {
      groupedData[monthYear][category] += cost_in_cents
    } else {
      groupedData[monthYear][category] = cost_in_cents
    }

    categories.add(category)
  })

  const monthYearDomain = getMonthYearDomain(expenseStartDate!, expenseEndDate!)

  const monthlyExpenses = Object.entries(groupedData).map(
    ([month, categories]) => ({
      month,
      ...categories,
    })
  )

  return {
    monthlyExpenses,
    categories: Array.from(categories).sort(),
    monthYearDomain,
  }
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
  const combinedMonthyExpenses = combineMonthlyExpenses(rawExpenses)

  return NextResponse.json({
    rawExpenses,
    combinedMonthyExpenses,
  })
}
