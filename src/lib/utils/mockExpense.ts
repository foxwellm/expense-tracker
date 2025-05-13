import { expenseCategories } from '@/lib/constants/expenses'
import { Expense } from '@/types/expense'

function getDateTiimeXMonthsAgo(monthsAgo: number) {
  const date = new Date()
  date.setMonth(date.getMonth() - monthsAgo)
  return date
}

function getRandomDate(startDate?: string, endDate?: string): string {
  const startDateTime: Date = startDate
    ? new Date(startDate)
    : getDateTiimeXMonthsAgo(3)
  const endDateTime: Date = endDate ? new Date(endDate) : new Date()

  const randomDateTime = new Date(
    startDateTime.getTime() +
      Math.random() * (endDateTime.getTime() - startDateTime.getTime())
  )

  const randomDate = randomDateTime.toISOString().split('T')[0] // yyyy-mm-dd
  return randomDate
}

function getRandomCategory() {
  return expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
}

function getRandomCostInCents() {
  const maxCost = 100 * 100 // $100
  const minCost = 5 * 100 // $5
  return Math.round(Math.random() * (maxCost - minCost) + minCost)
}

export function mockExpense(): Expense {
  const date = getRandomDate()
  return {
    date,
    category: getRandomCategory(),
    cost_in_cents: getRandomCostInCents(),
  }
}
