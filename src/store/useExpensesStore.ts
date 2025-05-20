import { ApolloError } from '@apollo/client'
import { PickerValue } from '@mui/x-date-pickers/internals'
import dayjs from 'dayjs'
import { create } from 'zustand'

import { CombinedMonthlyExpenses } from '@/types/expense'

type ExpensesStore = {
  startDayjsDate: PickerValue
  endDayjsDate: PickerValue
  startDateBound: string | null
  endDateBound: string | null
  setStartDayjsDate: (startDayjsDate: PickerValue) => void
  setEndDayjsDate: (endDayjsDate: PickerValue) => void
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
  startDayjsDate: dayjs().subtract(3, 'months'),
  endDayjsDate: dayjs(),
  startDateBound: dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
  endDateBound: dayjs().format('YYYY-MM-DD'),
  setStartDayjsDate: (startDayjsDate: PickerValue) =>
    set({
      startDayjsDate,
      startDateBound: startDayjsDate?.startOf('month').format('YYYY-MM-DD'),
    }),
  setEndDayjsDate: (endDayjsDate: PickerValue) =>
    set({
      endDayjsDate,
      endDateBound: endDayjsDate?.endOf('month').format('YYYY-MM-DD'),
    }),
  setQueryResult: ({ data, loading, error, refetch }) =>
    set({
      data: data?.combinedMonthlyExpenses,
      loading,
      error,
      refetch,
    }),
  data: null,
  loading: true,
  error: undefined,
  refetch: () => {},
}))
