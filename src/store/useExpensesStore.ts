import { ApolloError } from '@apollo/client'
import { PickerValue } from '@mui/x-date-pickers/internals'
import dayjs from 'dayjs'
import { create } from 'zustand'

import { Expense } from '@/types/expense'

type ExpensesStore = {
  startDayjsDate: PickerValue
  endDayjsDate: PickerValue
  startDateBound: string | null
  endDateBound: string | null
  setStartDayjsDate: (startDayjsDate: PickerValue) => void
  setEndDayjsDate: (endDayjsDate: PickerValue) => void
  setQueryResult: (result: {
    data: { userExpenses: Expense[] } | null | undefined
    loading: boolean
    error: ApolloError | undefined
    refetch: () => void
  }) => void
  setIsRenderReady: (isRenderReady: boolean) => void
  userExpenses: Expense[] | null | undefined
  loading: boolean
  error: ApolloError | undefined
  refetch: () => void
  // isRenderReady prevents double render from date state change and then
  // userExpenses updating from refetch
  isRenderReady: boolean
}

export const useExpensesStore = create<ExpensesStore>((set) => ({
  startDayjsDate: dayjs().subtract(2, 'months'),
  startDateBound: dayjs()
    .startOf('month')
    .subtract(2, 'months')
    .format('YYYY-MM-DD'),
  endDayjsDate: dayjs(),
  endDateBound: dayjs().endOf('month').format('YYYY-MM-DD'),
  setStartDayjsDate: (startDayjsDate) =>
    set({
      startDayjsDate,
      startDateBound: startDayjsDate?.startOf('month').format('YYYY-MM-DD'),
      isRenderReady: false,
    }),
  setEndDayjsDate: (endDayjsDate) =>
    set({
      endDayjsDate,
      endDateBound: endDayjsDate?.endOf('month').format('YYYY-MM-DD'),
      isRenderReady: false,
    }),
  setQueryResult: ({ data, loading, error, refetch }) =>
    set({
      userExpenses: data?.userExpenses,
      loading,
      error,
      refetch,
      isRenderReady: loading === false,
    }),
  setIsRenderReady: (isRenderReady) => set({ isRenderReady }),
  userExpenses: null,
  loading: true,
  error: undefined,
  refetch: () => {},
  isRenderReady: false,
}))
