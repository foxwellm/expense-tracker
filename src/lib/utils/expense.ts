import dayjs from 'dayjs'

import { expenseCategories } from '@/lib/constants/expenses'
import { CreateExpense, ExpenseCategory } from '@/types/expense'

import { expenseSubCategories } from '../constants/expenseSubCategories'
import { getRandomDateBetween } from './date'

type ExpenseSubCategories = typeof expenseSubCategories
type Category = keyof ExpenseSubCategories
type SubCategory<C extends Category> = keyof ExpenseSubCategories[C]

function getRandomCategory(): ExpenseCategory {
  return expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
}

export function getSubCategories(category: ExpenseCategory) {
  return Object.keys(expenseSubCategories[category]) as SubCategory<Category>[]
}

function getRandomSubCategory(category: ExpenseCategory) {
  const potentialSubCategories = getSubCategories(category)
  return potentialSubCategories[
    Math.floor(Math.random() * potentialSubCategories.length)
  ]
}

function getRandomNote(category: Category, subCategory: SubCategory<Category>) {
  const potentialNotes: string[] = expenseSubCategories[category][subCategory]
  return potentialNotes[Math.floor(Math.random() * potentialNotes.length)]
}

function getRandomCostInCents() {
  const maxCost = 100 * 100 // $100
  const minCost = 5 * 100 // $5
  return Math.round(Math.random() * (maxCost - minCost) + minCost)
}

export function getMockExpense(
  startDate: string,
  endDate: string
): CreateExpense {
  const category = getRandomCategory()
  const subCategory = getRandomSubCategory(category)
  const note = getRandomNote(category, subCategory)
  return {
    date: getRandomDateBetween(startDate, endDate),
    category,
    sub_category: subCategory,
    cost_in_cents: getRandomCostInCents(),
    note,
  }
}

export function getMockExpenses(
  quantity: number,
  startDate: string,
  endDate: string
): CreateExpense[] | undefined {
  if (!quantity || !dayjs(startDate) || !dayjs(endDate)) {
    return undefined
  }
  const mockExpenses = Array.from({ length: quantity }, () =>
    getMockExpense(startDate, endDate)
  )
  if (!mockExpenses.length) {
    return undefined
  }

  return mockExpenses
}
