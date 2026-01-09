import { create } from 'zustand';

interface CalendarState {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  nextDay: () => void;
  prevDay: () => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),

  setCurrentDate: (date) => set({ currentDate: date }),

  nextDay: () => {
    const d = new Date(get().currentDate);
    d.setDate(d.getDate() + 1);
    set({ currentDate: d });
  },

  prevDay: () => {
    const d = new Date(get().currentDate);
    d.setDate(d.getDate() - 1);
    set({ currentDate: d });
  },
}));
