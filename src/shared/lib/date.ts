import { timeToMinutes } from './time';
import type { CalendarEvent } from '../../entities/event/model/types';

export const isSameDay = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

export const isTimeOverlap = (
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

export const getEventsForDate = (events: CalendarEvent[], targetDate: Date) => {
    return events.filter((event) => {
        const eventDate = new Date(event.date);
        const d1 = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
        const d2 = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

        if (d1.getTime() === d2.getTime()) return true;
        if (d1.getTime() > d2.getTime()) return false;

        switch (event.repeat) {
            case 'daily': return true;
            case 'weekly': return d1.getDay() === d2.getDay();
            case 'monthly': return d1.getDate() === d2.getDate();
            case 'annually': 
                return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
            default: return false;
        }
    });
};