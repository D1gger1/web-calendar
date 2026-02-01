import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CalendarCategory {
    id: string;
    title: string;
    color: string;
    visible: boolean;
}

interface CalendarState {
    calendars: CalendarCategory[];
    addCalendar: (title: string, color: string) => void;
    toggleVisibility: (id: string) => void;
    deleteCalendar: (id: string) => void;
    updateCalendar: (id: string, title: string, color: string) => void;
}

export const useCalendarStore = create<CalendarState>()(
    persist(
        (set) => ({
            calendars: [],

            addCalendar: (title, color) =>
                set((state) => ({
                    calendars: [
                        ...state.calendars,
                        {
                            id: crypto.randomUUID(),
                            title,
                            color,
                            visible: true,
                        },
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
        }
    )
);