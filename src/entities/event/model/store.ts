import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CalendarCategory {
    id: string;
    title: string;
    color: string;
    visible: boolean;
}

export interface CalendarState {
    calendars: CalendarCategory[];
    currentDate: Date; 
    addCalendar: (title: string, color: string) => void;
    toggleVisibility: (id: string) => void;
    deleteCalendar: (id: string) => void;
    updateCalendar: (id: string, title: string, color: string) => void;
    setCurrentDate: (date: Date) => void; 
}

export const useCalendarStore = create<CalendarState>()(
    persist(
        (set) => ({
            calendars: [],
            currentDate: new Date(),

            setCurrentDate: (date) => set({ currentDate: date }),

            addCalendar: (title, color) =>
                set((state) => ({
                    calendars: [
                        ...state.calendars,
                        { id: crypto.randomUUID(), title, color, visible: true },
                    ],
                })),
            
            toggleVisibility: (id) =>
                set((state) => ({
                    calendars: state.calendars.map((c) =>
                        c.id === id ? { ...c, visible: !c.visible } : c
                    ),
                })),

            deleteCalendar: (id) =>
                set((state) => ({
                    calendars: state.calendars.filter((c) => c.id !== id),
                })),

            updateCalendar: (id, title, color) =>
                set((state) => ({
                    calendars: state.calendars.map((c) =>
                        c.id === id ? { ...c, title, color } : c
                    ),
                })),
        }),
        {
            name: 'calendar-storage',

            onRehydrateStorage: () => (state) => {
                if (state && state.currentDate) {
                    state.currentDate = new Date(state.currentDate);
                }
            },
        }
    )
);