import dayjs from 'dayjs'

import { expenseCategories } from '@/lib/constants/expenses'
import { getMonthYear } from '@/lib/utils/date'
import {
  CombinedMonthlyExpenses,
  Expense,
  ExpenseCategory,
} from '@/types/expense'

export function getMonthYearDomain(
  startDate: string | null,
  endDate: string | null
) {
  if (!startDate || !endDate) return

  let monthYearDomain: string[] = []
  // setting dates to 1st of the month to protect against going to next month from 31st and Feb
  let startDateObj = dayjs(startDate).set('date', 1)
  const stopDateObj = dayjs(endDate).set('date', 1).add(1, 'month')

  let whileCount = 0
  while (startDateObj < stopDateObj && whileCount < 12) {
    monthYearDomain = [...monthYearDomain, getMonthYear(startDateObj)]
    const nextMonth = startDateObj.month() + 1
    startDateObj = startDateObj.set('month', nextMonth)
    whileCount++
  }
  return monthYearDomain
}

export function combineMonthlyExpenses(
  expenses: Expense[]
): CombinedMonthlyExpenses {
  const groupedData: Record<
    string,
    Partial<Record<ExpenseCategory, number>>
  > = {}
  const categoriesSet = new Set<ExpenseCategory>()

  expenses.forEach(({ date, category, cost_in_cents }) => {
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

    categoriesSet.add(category)
  })

  const categories = Array.from(categoriesSet).sort()

  const monthlyExpenses = Object.entries(groupedData).map(
    ([month, categoryCosts]) => {
      expenseCategories.forEach((category) => {
        if (!categoryCosts[category]) {
          // d3.js charts require each iteration to have every available expense category, even if 0 cost
          categoryCosts = { ...categoryCosts, [category]: 0 }
        }
      })
      return {
        month,
        ...categoryCosts,
      }
    }
  )

  return {
    monthlyExpenses,
    categories,
  }
}
