'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Box, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'

import { ADD_EXPENSES } from '@/app/api/graphql/mutations'
import { GET_COMBINED_EXPENSES } from '@/app/api/graphql/queries'
import { CombinedMonthlyExpenses, Expense } from '@/types/expense'

import { AddExpenseForm } from './AddExpenseForm'
import { ErrorMessage } from './ErrorMessage'
import { VertBarChart } from './VertBarChart'

export function VertBarChartContainer() {
  const { data, loading, error, refetch } = useQuery(GET_COMBINED_EXPENSES)
  const [chartData, setChartData] = useState<CombinedMonthlyExpenses | null>(
    null
  )
  const [addExpenses] = useMutation(ADD_EXPENSES)

  useEffect(() => {
    if (data?.combinedMonthlyExpenses) {
      setChartData(data.combinedMonthlyExpenses)
    }
  }, [data])

  const handleAddExpense = async (newExpense: Expense) => {
    await addExpenses({
      variables: { expenses: [newExpense] },
    })

    const { data: updated } = await refetch()
    setChartData(updated.combinedMonthlyExpenses)
  }

  return (
    <>
      <Box sx={{ aspectRatio: '16 / 9', marginY: 6 }}>
        {error ? (
          <ErrorMessage message={error?.message} />
        ) : loading ? (
          <Skeleton variant="rectangular" height="100%" />
        ) : !chartData?.monthlyExpenses ||
          !chartData?.categories ||
          !chartData?.monthYearDomain ? (
          <ErrorMessage message="Incomplete data received." />
        ) : (
          <VertBarChart
            monthlyExpenses={chartData.monthlyExpenses}
            categories={chartData.categories}
            monthYearDomain={chartData.monthYearDomain}
          />
        )}
      </Box>
      <AddExpenseForm onSubmit={handleAddExpense} loading={loading} />
    </>
  )
}
