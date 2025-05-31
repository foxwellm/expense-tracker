import Stack from '@mui/material/Stack'

import { useExpensesStore } from '@/store'

import { ExpenseCard } from './ExpenseCard'

export function EditExpenses() {
  const userExpenses = useExpensesStore((s) => s.userExpenses)

  if (!userExpenses) return <></>

  return (
    <Stack spacing={1}>
      {userExpenses.map((userExpense) => {
        return <ExpenseCard key={userExpense.id} {...userExpense} />
      })}
    </Stack>
  )
}
