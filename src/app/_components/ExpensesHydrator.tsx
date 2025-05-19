'use client'

import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { GET_COMBINED_EXPENSES } from '@/app/api/graphql/queries'
import { useExpensesStore } from '@/store'

export function ExpensesHydrator() {
  const { setQueryResult } = useExpensesStore()
  // const { startDate, endDate, setQueryResult } = useExpensesStore((s) => ({
  //   startDate: s.startDate,
  //   endDate: s.endDate,
  //   setQueryResult: s.setQueryResult,
  // }))

  const { data, loading, error, refetch } = useQuery(GET_COMBINED_EXPENSES)

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
