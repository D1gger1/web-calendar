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