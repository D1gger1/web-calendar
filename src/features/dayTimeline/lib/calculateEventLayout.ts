import type { CalendarEvent } from '../../../entities/event/model/types';
import { timeToMinutes } from '../../../shared/lib/time';

export type PositionedEvent = CalendarEvent & {
  columnIndex: number;
  columnsCount: number;
};

export const calculateEventLayout = (
  events: CalendarEvent[]
): PositionedEvent[] => {
  if (events.length === 0) return [];

  const sorted = [...events].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );

  const result: PositionedEvent[] = [];
  const activeColumns: PositionedEvent[][] = [];

  for (const event of sorted) {
    let placed = false;

    for (let colIndex = 0; colIndex < activeColumns.length; colIndex++) {
      const column = activeColumns[colIndex];
      const lastEvent = column[column.length - 1];

      if (!isOverlap(lastEvent, event)) {
        const positioned: PositionedEvent = {
          ...event,
          columnIndex: colIndex,
          columnsCount: 0,
        };

        column.push(positioned);
        result.push(positioned);
        placed = true;
        break;
      }
    }

    if (!placed) {
      const positioned: PositionedEvent = {
        ...event,
        columnIndex: activeColumns.length,
        columnsCount: 0,
      };

      activeColumns.push([positioned]);
      result.push(positioned);
    }
  }

  const columnsCount = activeColumns.length;

  result.forEach((e) => {
    e.columnsCount = columnsCount;
  });

  return result;
};

const isOverlap = (a: CalendarEvent, b: CalendarEvent) => {
  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);

  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);

  return aStart < bEnd && aEnd > bStart;
};
