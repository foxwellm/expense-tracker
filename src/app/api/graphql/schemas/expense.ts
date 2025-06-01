import { z } from 'zod/v4'

import { expenseCategories } from '@/lib/constants/expenses'

export const baseExpenseSchema = z.object({
  date: z.iso.date(), // yyyy-mm-dd
  category: z.enum(expenseCategories),
  sub_category: z.string(),
  cost_in_cents: z.number().positive().multipleOf(1),
  note: z.string().max(100).optional(),
})

export const expenseSchema = baseExpenseSchema.extend({
  id: z.uuid(),
})

export const createExpenseSchema = baseExpenseSchema
export const updateExpenseSchema = baseExpenseSchema

export const createExpensesSchema = z.array(createExpenseSchema)
