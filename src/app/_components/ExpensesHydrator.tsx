'use client'

import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { GET_USER_EXPENSES } from '@/app/api/graphql/queries'
import { useExpensesStore } from '@/store'

export function ExpensesHydrator() {
  const startDateBound = useExpensesStore((s) => s.startDateBound)
  const endDateBound = useExpensesStore((s) => s.endDateBound)
  const setQueryResult = useExpensesStore((s) => s.setQueryResult)

  const { data, loading, error, refetch } = useQuery(GET_USER_EXPENSES, {
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
