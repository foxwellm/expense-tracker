'use client'

import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { GET_COMBINED_EXPENSES } from '@/app/api/graphql/queries'
import { useExpensesStore } from '@/store'

export function ExpensesHydrator() {
  const { startDateBound, endDateBound, setQueryResult } = useExpensesStore()

  const { data, loading, error, refetch } = useQuery(GET_COMBINED_EXPENSES, {
    variables: {
      startDate: startDateBound,
      endDate: endDateBound,
    },
  })

  useEffect(() => {
    setQueryResult({
      data,
      loading,
      error,
      refetch,
    })
  }, [data, loading, error, refetch, setQueryResult])

  return null
}
