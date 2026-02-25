export type RepeatType =
    | 'none'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'annually';

export type CalendarEvent = {
    id: string;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    allDay: boolean;
    repeat: RepeatType;
    calendarId: string;
    calendarName?: string;
    description: string;
    createdAt: Date;
}

export type CreateEventResult =
    | { ok: true }
    | { ok: false; error: string };

export interface EventState {
    events: CalendarEvent[];
    selectedEvent: CalendarEvent | null;
    setSelectedEvent: (event: CalendarEvent | null) => void;
    clearSelectedEvent: () => void;
    createEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt'>) => CreateEventResult;
    updateEvent: (id: string, event: Omit<CalendarEvent, 'id' | 'createdAt'>) => CreateEventResult;
    deleteEvent: (id: string) => void;
    deleteEventsByCalendarId: (calendarId: string) => void;
}

export interface CalendarCategory {
    id: string;
    title: string;
    color: string;
    visible: boolean;
}
export interface CalendarDataState {
    calendars: CalendarCategory[];
    currentDate: Date;
}
