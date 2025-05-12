import { z } from 'zod'

import { expenseCategories } from '@/lib/constants/expenses'

export const expenseSchema = z.object({
  date: z.string().date(), // yyyy-mm-dd
  expense: z.enum(expenseCategories),
  cost_in_cents: z.number().positive().multipleOf(1),
  // name: z.string().max(100),
})

export const expensesSchema = z.array(expenseSchema)
