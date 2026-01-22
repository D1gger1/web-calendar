import { create } from 'zustand';
import type { CalendarEvent } from './types';

type EventState = {
  events: CalendarEvent[];
  createEvent: (
    event: Omit<CalendarEvent, 'id' | 'createdAt'>
  ) => void;
  deleteEvent: (id: string) => void;
};

export const useEventStore = create<EventState>((set) => ({
  events: [],

  createEvent: (event) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          ...event,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
      ],
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}));
