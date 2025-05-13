import { z } from 'zod'

import { expenseCategories } from '@/lib/constants/expenses'
import { expenseSchema } from '@/lib/schemas/expense'

export type Expense = z.infer<typeof expenseSchema>

export type ExpenseCategory = (typeof expenseCategories)[number]
