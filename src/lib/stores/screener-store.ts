import { create } from 'zustand';
import { ScreenerFilters } from '../types/screener';

interface ScreenerState {
  filters: ScreenerFilters;
  setFilter: <K extends keyof ScreenerFilters>(key: K, value: ScreenerFilters[K]) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
}

const defaultFilters: ScreenerFilters = {
  type: 'ALL',
  sector: 'ALL',
  exchange: 'ALL',
  country: 'ALL',
  minMultiplier: 5,
  page: 1,
  sortBy: 'multiplication',
  sortOrder: 'desc',
};

export const useScreenerStore = create<ScreenerState>((set) => ({
  filters: { ...defaultFilters },
  
  setFilter: (key, value) => set((state) => ({
    filters: {
      ...state.filters,
      [key]: value,
      // Reset page to 1 when a filter changes (unless the filter changing IS the page)
      ...(key !== 'page' ? { page: 1 } : {})
    }
  })),
  
  resetFilters: () => set({ filters: { ...defaultFilters } }),
  
  setPage: (page) => set((state) => ({
    filters: {
      ...state.filters,
      page
    }
  })),
}));
