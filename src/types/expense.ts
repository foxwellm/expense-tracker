import { z } from 'zod'

import { expenseSchema } from '@/lib/schemas/expense'

export type Expense = z.infer<typeof expenseSchema>
