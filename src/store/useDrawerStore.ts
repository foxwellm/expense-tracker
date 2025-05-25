import { create } from 'zustand'

interface DrawerState {
  isDrawerOpen: boolean
  toggleDrawerOpen: (state: DrawerState) => void
  openDrawer: () => void
  closeDrawer: () => void
}

export const useDrawerState = create<DrawerState>((set) => ({
  isDrawerOpen: false,
  toggleDrawerOpen: (state) => set({ isDrawerOpen: !state.isDrawerOpen }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}))
