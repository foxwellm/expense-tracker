import { create } from 'zustand'

import { CombinedMonthlyExpenses } from '@/types/expense'

interface ExpensesState {
  combinedMonthyExpenses: CombinedMonthlyExpenses | null
  updateCombinedMonthlyExpenses: (
    combinedMonthyExpenses: CombinedMonthlyExpenses
  ) => void
}

export const useExpensesStore = create<ExpensesState>((set) => ({
  combinedMonthyExpenses: null,
  updateCombinedMonthlyExpenses: (combinedMonthyExpenses) =>
    set({ combinedMonthyExpenses }),
}))
