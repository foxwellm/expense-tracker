import { z } from 'zod'

import { expenseCategories } from '@/constants/expenses'

export const expenseSchema = z.object({
  date: z.string().date(), // yyyy-mm-dd
  expense: z.enum(expenseCategories),
  cost: z.number().positive(),
  // name: z.string().max(100),
})

export const expensesSchema = z.array(expenseSchema)
