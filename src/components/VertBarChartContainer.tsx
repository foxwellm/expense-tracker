'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Box, Skeleton } from '@mui/material'
import { useEffect } from 'react'

import { ADD_EXPENSES } from '@/app/api/graphql/mutations'
import { GET_COMBINED_EXPENSES } from '@/app/api/graphql/queries'
import { useExpensesStore } from '@/store'
import { Expense } from '@/types/expense'

import { AddExpenseForm } from './AddExpenseForm'
import { ErrorMessage } from './ErrorMessage'
import { VertBarChart } from './VertBarChart'

export function VertBarChartContainer() {
  const { data, loading, error, refetch } = useQuery(GET_COMBINED_EXPENSES)
  const [addExpenses] = useMutation(ADD_EXPENSES)

  const { combinedMonthyExpenses, updateCombinedMonthlyExpenses } =
    useExpensesStore((state) => state)

  useEffect(() => {
    if (data?.combinedMonthlyExpenses) {
      updateCombinedMonthlyExpenses(data.combinedMonthlyExpenses)
    }
  }, [data, updateCombinedMonthlyExpenses])

  const handleAddExpense = async (newExpense: Expense) => {
    await addExpenses({
      variables: { expenses: [newExpense] },
    })

    const { data: updated } = await refetch()
    updateCombinedMonthlyExpenses(updated.combinedMonthlyExpenses)
  }

  return (
    <>
      <Box sx={{ aspectRatio: '16 / 9', marginY: 6 }}>
        {error ? (
          <ErrorMessage message={error?.message} />
        ) : loading ? (
          <Skeleton variant="rectangular" height="100%" />
        ) : !combinedMonthyExpenses ? (
          <ErrorMessage message="Incomplete data received." />
        ) : (
          <VertBarChart {...combinedMonthyExpenses} />
        )}
      </Box>
      <AddExpenseForm onSubmit={handleAddExpense} loading={loading} />
    </>
  )
}
