import { Button } from '@mui/material'

import { getMockExpenses } from '@/lib/utils/expense'

export function AddMockExpenses() {
  const mockExpenses = getMockExpenses(50, '2025-02-26', '2025-05-26')

  if (!mockExpenses) return <></>

  const mockExpensesSorted = mockExpenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      <Button>{mockExpensesSorted[0].date}</Button>
    </>
  )
}
