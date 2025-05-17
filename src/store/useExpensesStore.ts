import { ApolloError } from '@apollo/client'
import { create } from 'zustand'

import { CombinedMonthlyExpenses, Expense } from '@/types/expense'

type AddExpensesVars = {
  variables: {
    expenses: Expense[]
  }
}

type AddedExpenses = {
  addExpenses: Expense[]
}

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
  setMutationResult: (result: {
    mutationData: AddedExpenses | null | undefined
    mutationLoading: boolean
    mutationError: ApolloError | undefined
    addExpenses: (variables: AddExpensesVars) => void
  }) => void
  data: CombinedMonthlyExpenses | null | undefined
  loading: boolean
  error: ApolloError | undefined
  refetch: () => void
  addExpense: (expense: Expense) => void
  addExpenses: (expenses: Expense[]) => void
  mutationData: AddedExpenses | null | undefined
  mutationLoading: boolean
  mutationError: ApolloError | undefined
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
  setMutationResult: (result) =>
    set({
      mutationData: result.mutationData,
      mutationLoading: result.mutationLoading,
      mutationError: result.mutationError,
      addExpense: (expense: Expense) => {
        result.addExpenses?.({ variables: { expenses: [expense] } })
      },
      addExpenses: (expenses: Expense[]) => {
        result.addExpenses?.({ variables: { expenses } })
      },
    }),
  data: null,
  loading: true,
  error: undefined,
  refetch: () => {},
  addExpense: () => {},
  addExpenses: () => {},
  mutationData: null,
  mutationLoading: false,
  mutationError: undefined,
}))
