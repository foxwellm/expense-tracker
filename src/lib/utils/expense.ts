import { expenseCategories } from '@/lib/constants/expenses'
import { Expense } from '@/types/expense'

import { getRandomDateBetween } from './date'

function getRandomCategory() {
  return expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
}

function getRandomCostInCents() {
  const maxCost = 100 * 100 // $100
  const minCost = 5 * 100 // $5
  return Math.round(Math.random() * (maxCost - minCost) + minCost)
}

export function mockExpense(startDate: string, endDate: string): Expense {
  return {
    date: getRandomDateBetween(startDate, endDate),
    category: getRandomCategory(),
    cost_in_cents: getRandomCostInCents(),
  }
}
