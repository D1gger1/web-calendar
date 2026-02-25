import { create } from 'zustand';
import type { CalendarEvent, EventState } from './types';
import { isSameDay, isTimeOverlap } from '../../../shared/lib/date';

const STORAGE_KEY = 'calendar-events';

const loadEvents = (): CalendarEvent[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        const parsed: any[] = JSON.parse(raw);
        return parsed.map((event) => ({
            ...event,
            date: new Date(event.date),
            createdAt: new Date(event.createdAt),
        }));
    } catch { return []; }
};

const saveEvents = (events: CalendarEvent[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const useEventStore = create<EventState>((set, get) => ({
    events: loadEvents(),
    selectedEvent: null,

    setSelectedEvent: (event) => set({ selectedEvent: event }),
    clearSelectedEvent: () => set({ selectedEvent: null }),

    createEvent: (eventData) => {
        const events = get().events;

        const isDuplicate = events.some((e) =>
            e.title === eventData.title &&
            isSameDay(e.date, eventData.date) &&
            e.startTime === eventData.startTime &&
            e.endTime === eventData.endTime &&
            e.calendarId === eventData.calendarId
        );

        if (isDuplicate) return { ok: false, error: 'This event already exists' };

        if (!eventData.allDay) {
            const hasOverlap = events.some((e) => {
                if (e.allDay || e.calendarId !== eventData.calendarId || !isSameDay(e.date, eventData.date)) return false;
                return isTimeOverlap(e.startTime, e.endTime, eventData.startTime, eventData.endTime);
            });
            if (hasOverlap) return { ok: false, error: 'This time is already occupied' };
        }

        const newEvent: CalendarEvent = {
            ...eventData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
        };

        const updatedEvents = [...events, newEvent];
        saveEvents(updatedEvents);
        set({ events: updatedEvents });
        return { ok: true };
    },

    updateEvent: (id, eventData) => {
        const events = get().events;

        if (!eventData.allDay) {
            const hasOverlap = events.some((e) => {
                if (e.id === id || e.allDay || e.calendarId !== eventData.calendarId || !isSameDay(e.date, eventData.date)) return false;
                return isTimeOverlap(e.startTime, e.endTime, eventData.startTime, eventData.endTime);
            });
            if (hasOverlap) return { ok: false, error: 'This time is already occupied' };
        }

        const updatedEvents = events.map((e) => e.id === id ? { ...e, ...eventData } : e);
        saveEvents(updatedEvents);
        set({ events: updatedEvents, selectedEvent: null });
        return { ok: true };
    },

    deleteEvent: (id) =>
        set((state) => {
            const updatedEvents = state.events.filter((e) => e.id !== id);
            saveEvents(updatedEvents);
            return { events: updatedEvents, selectedEvent: null };
        }),

    deleteEventsByCalendarId: (calendarId) =>
        set((state) => {
            const updatedEvents = state.events.filter((e) => String(e.calendarId) !== String(calendarId));
            saveEvents(updatedEvents);
            return { events: updatedEvents };
        }),
}));