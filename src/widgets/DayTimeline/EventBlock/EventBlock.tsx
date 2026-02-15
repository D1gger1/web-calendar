import styles from './EventBlock.module.scss';
import type { CalendarEvent } from '../../../entities/event/model/types';
import { timeToMinutes } from '../../../shared/lib/time';
import { HOUR_HEIGHT, START_HOUR } from '../constants';
import { useEventStore } from '../../../entities/event/model/eventStore';

type Props = {
  event: CalendarEvent;
  calendarColor: string;
};

const START_MINUTES = START_HOUR * 60;
const PIXELS_PER_MINUTE = HOUR_HEIGHT / 60;

export const EventBlock = ({ event, calendarColor }: Props) => {
  const setSelectedEvent = useEventStore((s) => s.setSelectedEvent);

  if (!event.allDay && (!event.startTime || !event.endTime)) {
    return null;
  }

  const rawStart = timeToMinutes(event.startTime) - START_MINUTES;
  const rawEnd = timeToMinutes(event.endTime) - START_MINUTES;
  const start = Math.max(rawStart, 0);
  const end = Math.min(rawEnd, 24 * 60);

  const top = (start * PIXELS_PER_MINUTE) + HOUR_HEIGHT;
  const height = Math.max((end - start) * PIXELS_PER_MINUTE, 22);

  const isShort = !event.allDay && (end - start) <= 30;

  return (
    <div
      className={`${styles.event} ${isShort ? styles.short : ''} ${event.allDay ? styles.allDay : styles.timed}`}
      style={{
        position: event.allDay ? 'relative' : 'absolute',
        top: event.allDay ? 'auto' : `${top}px`,
        height: event.allDay ? '24px' : `${height}px`,
        width: '100%',
        left: 0,
        ['--event-color' as any]: calendarColor,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedEvent(event);
      }}
    >
      <div className={styles.content}>
        <div className={styles.title}>{event.title}</div>
        {!event.allDay && (
          <div className={styles.time}>
            {isShort ? `, ${event.startTime}` : `${event.startTime} - ${event.endTime}`}
          </div>
        )}
      </div>
    </div>
  );
};