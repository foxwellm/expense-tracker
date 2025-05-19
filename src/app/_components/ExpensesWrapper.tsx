'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { ReactNode } from 'react'

import { ADD_EXPENSES } from '@/app/api/graphql/mutations'
import { GET_COMBINED_EXPENSES } from '@/app/api/graphql/queries'
import { useExpensesStore } from '@/store'

export function ExpensesWrapper({ children }: { children: ReactNode }) {
  const { setQueryResult, setMutationResult } = useExpensesStore()
  // const { startDate, endDate, setQueryResult } = useExpensesStore((s) => ({
  //   startDate: s.startDate,
  //   endDate: s.endDate,
  //   setQueryResult: s.setQueryResult,
  // }))

  const { data, loading, error, refetch } = useQuery(GET_COMBINED_EXPENSES)
  const [
    addExpenses,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_EXPENSES, {
    refetchQueries: [GET_COMBINED_EXPENSES],
  })

  useEffect(() => {
    setMutationResult({
      addExpenses,
      mutationData,
      mutationLoading,
      mutationError,
    })
  }, [
    addExpenses,
    mutationData,
    mutationLoading,
    mutationError,
    setMutationResult,
  ])

  useEffect(() => {
    setQueryResult({
      data,
      loading,
      error,
      refetch,
    })
  }, [data, loading, error, refetch, setQueryResult])

  return <Box>{children}</Box>
}
