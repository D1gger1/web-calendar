import { create } from "zustand";
import type { CalendarEvent } from "./types";

type CalendarState = {
    currentDate: Date;
    setDate: (date: Date) => void;
    nextDay: () => void;
    prevDay: () => void;
    
    getDayEvents?: (
        events: CalendarEvent[]
    ) => CalendarEvent[]
};

export const useCalendarStore = create<CalendarState>((set, get) => ({
    currentDate: new Date(),

    setDate: (date) => set({currentDate: date}),

    nextDay: () => 
        set((state) => ({
            currentDate: new Date(
            state.currentDate.getFullYear(),
            state.currentDate.getMonth(),
            state.currentDate.getDate() + 1
            ),
        })),

        prevDay: () => 
            set((state) => ({
                currentDate: new Date(
                    state.currentDate.getFullYear(),
                    state.currentDate.getMonth(),
                    state.currentDate.getDate() - 1
                ),
            })),

            getDayEvents: (events) => {
                const currentDate = get().currentDate;

                return events.filter(
                    (event) => 
                        event.date.toDateString() === currentDate.toDateString()
                );
            },
}));