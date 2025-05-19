import { ApolloError } from '@apollo/client'
import { create } from 'zustand'

import { CombinedMonthlyExpenses } from '@/types/expense'

type ExpensesStore = {
  startDate: string
  endDate: string
  setDateRange: (start: string, end: string) => void
  setQueryResult: (result: {
    data:
      | { combinedMonthlyExpenses: CombinedMonthlyExpenses }
      | null
      | undefined
    loading: boolean
    error: ApolloError | undefined
    refetch: () => void
  }) => void
  data: CombinedMonthlyExpenses | null | undefined
  loading: boolean
  error: ApolloError | undefined
  refetch: () => void
}

export const useExpensesStore = create<ExpensesStore>((set) => ({
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  setDateRange: (start, end) => set({ startDate: start, endDate: end }),
  setQueryResult: (result) =>
    set({
      data: result.data?.combinedMonthlyExpenses,
      loading: result.loading,
      error: result.error,
      refetch: result.refetch,
    }),
  data: null,
  loading: true,
  error: undefined,
  refetch: () => {},
}))
