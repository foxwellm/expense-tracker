import { Button } from '@mui/material'

import { mockExpense } from '@/lib/utils/mockExpense'

export function AddMockExpenses() {
  const mockExpenses = Array.from({ length: 50 }, () => mockExpense())

  // console.log(
  //   '🚀 ~ AddMockExpenses.tsx:6 ~ AddMockExpenses ~ mockExpenses:',
  //   mockExpenses
  // )
  return (
    <>
      <Button>{mockExpenses[0].date}</Button>
    </>
  )
}
