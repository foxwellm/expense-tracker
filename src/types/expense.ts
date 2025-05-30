import { z } from 'zod/v4'

import {
  createExpenseSchema,
  expenseSchema,
} from '@/app/api/graphql/schemas/expense'
import { expenseCategories } from '@/lib/constants/expenses'

export type Expense = z.infer<typeof expenseSchema>
export type CreateExpense = z.infer<typeof createExpenseSchema>

export type ExpenseCategory = (typeof expenseCategories)[number]

export type MonthlyExpense = {
  month: string
} & Partial<Record<ExpenseCategory, number>>

export interface CombinedMonthlyExpenses {
  monthlyExpenses: MonthlyExpense[]
  categories: ExpenseCategory[]
}
