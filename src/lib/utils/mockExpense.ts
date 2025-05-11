import {
  expenseCategories,
  expenseDisplayMonths,
} from '@/lib/constants/expenses'
import { Expense } from '@/types/expense'

function getDateTiimeXMonthsAgo(monthsAgo: number) {
  const date = new Date()
  date.setMonth(date.getMonth() - monthsAgo)
  return date
}

function getRandomDate(
  startDate?: string,
  endDate?: string
): {
  date: string // yyyy-mm-dd
  month: string
} {
  const startDateTime: Date = startDate
    ? new Date(startDate)
    : getDateTiimeXMonthsAgo(3)
  const endDateTime: Date = endDate ? new Date(endDate) : new Date()

  const randomDateTime = new Date(
    startDateTime.getTime() +
      Math.random() * (endDateTime.getTime() - startDateTime.getTime())
  )

  const randomMonthValue: number = randomDateTime.getMonth()
  const randomMonth = expenseDisplayMonths[randomMonthValue]

  const randomDate = randomDateTime.toISOString().split('T')[0]
  return { date: randomDate, month: randomMonth }
}

function getRandomExpense() {
  return expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
}

function getRandomCost() {
  const maxCost = 100
  const minCost = 5
  return parseFloat((Math.random() * (maxCost - minCost) + minCost).toFixed(2))
}

export function mockExpense(): Expense & { month: string } {
  const { date, month } = getRandomDate()
  return {
    date,
    month,
    expense: getRandomExpense(),
    cost: getRandomCost(),
  }
}
