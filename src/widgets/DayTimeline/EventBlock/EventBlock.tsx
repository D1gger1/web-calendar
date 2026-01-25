import styles from './EventBlock.module.scss';
import type { CalendarEvent } from '../../../entities/event/model/types';
import { timeToMinutes } from '../../../shared/lib/time';
import { HOUR_HEIGHT } from '../constants';

type Props = {
  event: CalendarEvent & {
    columnIndex: number;
    columnCount: number;
  }
  calendarColor: string;
};

const START_MINUTES = 6 * 60;
const VISIBLE_MINUTES = 18 * 60;
const PIXELS_PER_MINUTE = HOUR_HEIGHT / 60;

export const EventBlock = ({ event, calendarColor }: Props) => {

  if (!event.allDay && (!event.startTime || !event.endTime)) {
    return null;
  }

  const rawStart = event.allDay
    ? 0
    : timeToMinutes(event.startTime) - START_MINUTES;

  const rawEnd = event.allDay
    ? VISIBLE_MINUTES
    : timeToMinutes(event.endTime) - START_MINUTES;

  const start = Math.max(rawStart, 0);
  const end = Math.min(rawEnd, VISIBLE_MINUTES);

  const top = start * PIXELS_PER_MINUTE;
  const height = Math.max((end - start) * PIXELS_PER_MINUTE, 30);

  const widthPercent = 100 / event.columnCount;
  const leftPercent = widthPercent * event.columnIndex

  return (
    <div
      className={styles.event}
      style={{
        top,
        height,
        width: `${widthPercent}%`,
        left: `${leftPercent}%`,
        ['--event-color' as any]: calendarColor,
      }}
    >
      <div className={styles.title}>{event.title}</div>

      {!event.allDay && (
        <div className={styles.time}>
          {event.startTime} - {event.endTime}
        </div>
      )}
    </div>
  );
};
