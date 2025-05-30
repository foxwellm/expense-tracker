import { z } from 'zod/v4'

import { expenseCategories } from '@/lib/constants/expenses'

export const expenseSchema = z.object({
  id: z.uuid(),
  date: z.iso.date(), // yyyy-mm-dd
  category: z.enum(expenseCategories),
  sub_category: z.string(),
  cost_in_cents: z.number().positive().multipleOf(1),
  note: z.string().max(100).optional(),
})

export const expensesSchema = z.array(expenseSchema)
