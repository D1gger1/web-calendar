import type { CalendarEvent } from '../../../entities/event/model/types';
import { timeToMinutes } from '../../../shared/lib/time';

export type PositionedEvent = CalendarEvent & {
  columnIndex: number;
  columnCount: number;
};

const isOverlap = (a: CalendarEvent, b: CalendarEvent) => {
  if (a.allDay || b.allDay) return false;

  if (!a.startTime || !a.endTime) return false;
  if (!b.startTime || !b.endTime) return false;

  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);

  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);

  return aStart < bEnd && aEnd > bStart;
};


export const calculateEventLayout = (
  events: CalendarEvent[]
): PositionedEvent[] => {

  const allDayEvents = events.filter(e => e.allDay);
  const timedEvents = events.filter(
    e => !e.allDay && e.startTime && e.endTime
  );

  const sorted = [...timedEvents].sort(
    (a, b) =>
      timeToMinutes(a.startTime!) - timeToMinutes(b.startTime!)
  );

  const groups: CalendarEvent[][] = [];

  for (const event of sorted) {
    let placed = false;

    for (const group of groups) {
      if (group.some(e => isOverlap(e, event))) {
        group.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groups.push([event]);
    }
  }

  const positioned: PositionedEvent[] = [];

  for (const group of groups) {
    const columns: CalendarEvent[][] = [];

    for (const event of group) {
      let columnIndex = -1;

      for (let i = 0; i < columns.length; i++) {
        const lastInColumn = columns[i][columns[i].length - 1];

        if (!isOverlap(lastInColumn, event)) {
          columnIndex = i;
          break;
        }
      }

      if (columnIndex === -1) {
        columns.push([event]);
        columnIndex = columns.length - 1;
      } else {
        columns[columnIndex].push(event);
      }

      positioned.push({
        ...event,
        columnIndex,
        columnCount: columns.length,
      });
    }
  }

  return [
    ...allDayEvents.map(e => ({
      ...e,
      columnIndex: 0,
      columnCount: 1,
    })),
    ...positioned,
  ];
};
