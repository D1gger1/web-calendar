import { create } from 'zustand';
import type { CalendarEvent } from './types';
import { timeToMinutes } from '../../../shared/lib/time';

const STORAGE_KEY = 'calendar-events';

const loadEvents = (): CalendarEvent[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: CalendarEvent[] = JSON.parse(raw);
    return parsed.map((event) => ({
      ...event,
      date: new Date(event.date),
      createdAt: new Date(event.createdAt),
    }));
  } catch {
    return [];
  }
};

const saveEvents = (events: CalendarEvent[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

const isSameDay = (a: Date, b: Date) =>
  a.toDateString() === b.toDateString();

const isTimeOverlap = (
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string
) => {
  const aS = timeToMinutes(aStart);
  const aE = timeToMinutes(aEnd);
  const bS = timeToMinutes(bStart);
  const bE = timeToMinutes(bEnd);
  return aS < bE && aE > bS;
};

type CreateEventResult =
  | { ok: true }
  | { ok: false; error: string };

type EventState = {
  events: CalendarEvent[];
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  clearSelectedEvent: () => void;
  createEvent: (
    event: Omit<CalendarEvent, 'id' | 'createdAt'>
  ) => CreateEventResult;

  updateEvent: (
    id: string, 
    event: Omit<CalendarEvent, 'id' | 'createdAt'>
  ) => CreateEventResult;
  deleteEvent: (id: string) => void;
};

export const useEventStore = create<EventState>((set, get) => ({
  events: loadEvents(),
  selectedEvent: null,

  setSelectedEvent: (event) => set({ selectedEvent: event }),
  clearSelectedEvent: () => set({ selectedEvent: null }),

  createEvent: (event) => {
    const events = get().events;

    const isDuplicate = events.some((e) =>
      e.title === event.title &&
      isSameDay(e.date, event.date) &&
      e.startTime === event.startTime &&
      e.endTime === event.endTime &&
      e.calendarId === event.calendarId
    );

    if (isDuplicate) return { ok: false, error: 'This event already exists' };

    if (!event.allDay) {
      const hasOverlap = events.some((e) => {
        if (e.allDay || e.calendarId !== event.calendarId || !isSameDay(e.date, event.date)) return false;
        return isTimeOverlap(e.startTime, e.endTime, event.startTime, event.endTime);
      });
      if (hasOverlap) return { ok: false, error: 'This time is already occupied' };
    }

    const newEvent: CalendarEvent = {
      ...event,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    const updatedEvents = [...events, newEvent];
    saveEvents(updatedEvents);
    set({ events: updatedEvents });
    return { ok: true };
  },

  updateEvent: (id, event) => {
    const events = get().events;

    if (!event.allDay) {
      const hasOverlap = events.some((e) => {
        if (
          e.id === id || 
          e.allDay || 
          e.calendarId !== event.calendarId || 
          !isSameDay(e.date, event.date)
        ) return false;

        return isTimeOverlap(e.startTime, e.endTime, event.startTime, event.endTime);
      });

      if (hasOverlap) return { ok: false, error: 'This time is already occupied' };
    }

    const updatedEvents = events.map((e) => 
      e.id === id 
        ? { ...e, ...event } 
        : e
    );

    saveEvents(updatedEvents);
    set({ events: updatedEvents, selectedEvent: null });
    return { ok: true };
  },

  deleteEvent: (id) =>
    set((state) => {
      const updatedEvents = state.events.filter((e) => e.id !== id);
      saveEvents(updatedEvents);
      return {
        events: updatedEvents,
        selectedEvent: null,
      };
    }),
}));