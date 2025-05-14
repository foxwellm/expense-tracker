import dayjs, { Dayjs } from 'dayjs'

import { expenseDisplayMonths } from '@/lib/constants/expenses'
import {
  CombinedMonthlyExpenses,
  Expense,
  ExpenseCategory,
} from '@/types/expense'

// yyyy-mm-dd || Dayjs
export function getMonthYear(fullDate: string | Dayjs) {
  const date = dayjs(fullDate)
  const monthValue = date.month()
  const month = expenseDisplayMonths[monthValue]
  const year = date.year().toString().slice(-2)
  return `${month} ${year}`
}

export function getMonthYearDomain(startDate: string, endDate: string) {
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

    categoriesSet.add(category)
  })

  const monthYearDomain = getMonthYearDomain(expenseStartDate!, expenseEndDate!)
  const categories = Array.from(categoriesSet).sort()

  const monthlyExpenses = Object.entries(groupedData).map(
    ([month, categoryCosts]) => {
      categories.forEach((category) => {
        if (!categoryCosts[category]) {
          // d3.js charts require each iteration to have every available category, even if 0 cost
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
    monthYearDomain,
  }
}
