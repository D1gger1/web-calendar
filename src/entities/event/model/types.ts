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
