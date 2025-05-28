import { create } from 'zustand'

interface DateRangeState {
  range: [number, number]
  setRange: (range: [number, number]) => void
}

export const useDateRangeStore = create<DateRangeState>((set) => ({
  range: [9, 11],
  setRange: (range) => set({ range }),
}))
