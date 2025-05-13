import { Button } from '@mui/material'

import { mockExpense } from '@/lib/utils/mockExpense'

export function AddMockExpenses() {
  const mockExpenses = Array.from({ length: 50 }, () => mockExpense())
  const mockExpensesSorted = mockExpenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      <Button>{mockExpensesSorted[0].date}</Button>
    </>
  )
}
