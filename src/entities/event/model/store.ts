import { create } from "zustand";

type CalendarState = {
    currentDate: Date;
    setDate: (date: Date) => void;
    nextDay: () => void;
    prevDay: () => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
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
            }))
}))