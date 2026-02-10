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
    // Методы навигации
    setCurrentDate: (date: Date) => void;
    nextDay: () => void;
    prevDay: () => void;
    // Методы управления категориями
    addCalendar: (title: string, color: string) => void;
    toggleVisibility: (id: string) => void;
    deleteCalendar: (id: string) => void;
    updateCalendar: (id: string, title: string, color: string) => void;
}

export const useCalendarStore = create<CalendarState>()(
    persist(
        (set) => ({
            calendars: [],
            currentDate: new Date(),

            // Установка конкретной даты (из DatePicker)
            setCurrentDate: (date) => set({ currentDate: date }),

            // Переход к следующему дню
            nextDay: () =>
                set((state) => {
                    const next = new Date(state.currentDate);
                    next.setDate(state.currentDate.getDate() + 1);
                    return { currentDate: next };
                }),

            // Переход к предыдущему дню
            prevDay: () =>
                set((state) => {
                    const prev = new Date(state.currentDate);
                    prev.setDate(state.currentDate.getDate() - 1);
                    return { currentDate: prev };
                }),

            addCalendar: (title, color) =>
                set((state) => {
                    if (state.calendars.length >= 4) return state;
                    return {
                        calendars: [
                            ...state.calendars,
                            {
                                id: crypto.randomUUID(),
                                title,
                                color,
                                visible: true,
                            },
                        ],
                    };
                }),

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
            // Превращаем строку из JSON обратно в объект Date при загрузке страницы
            onRehydrateStorage: () => (state) => {
                if (state && state.currentDate) {
                    state.currentDate = new Date(state.currentDate);
                }
            },
        }
    )
);