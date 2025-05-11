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
  const randomDate = randomDateTime.toISOString().split('T')[0]
  return randomDate // yyyy-mm-dd
}

function getRandomExpense() {
  return expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
}

function getRandomCost() {
  return parseFloat((Math.random() * (100 - 5) + 5).toFixed(2))
}

export function mockExpense(): Expense {
  return {
    date: getRandomDate(),
    expense: getRandomExpense(),
    cost: getRandomCost(),
  }
}
