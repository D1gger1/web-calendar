import styles from './DayTimeline.module.scss';
import { useCalendarStore } from '../../entities/event/model/store';
import { useEventStore } from '../../entities/event/model/eventStore';
import { DayHeader } from './DayHeader';
import { TimeColumn } from './TimeColumn';
import { TimelineGrid } from './TimelineGrid';
import { EventBlock } from './EventBlock/EventBlock';
import { EventDetailsModal } from '../../features/eventDetails/EventDetailModal';
import { calculateEventLayout } from '../../features/dayTimeline/lib/calculateEventLayout';

export const DayTimeline = () => {
  const currentDate = useCalendarStore((state) => state.currentDate);
  const getDayEvents = useCalendarStore((state) => state.getDayEvents);
  const events = useEventStore((state) => state.events);

  const dayEvents = getDayEvents ? getDayEvents(events) : [];

  const layoutEvents = calculateEventLayout(dayEvents);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <DayHeader date={currentDate} />
      </div>

      <div className={styles.scroll}>
        <TimeColumn />

        <div className={styles.timeline}>
          <TimelineGrid />

          {layoutEvents.map((event) => (
            <EventBlock
              key={event.id}
              event={event}
              calendarColor={getCalendarColor(event.calendarId)}
            />
          ))}
        </div>
        <EventDetailsModal />
      </div>
    </div>
  );
};

const getCalendarColor = (id: string) => {
  const map: Record<string, string> = {
    '1': '#FACC15',
    '2': '#9333EA',
    '3': '#BE123C',
    '4': '#0D9488',
  };

  return map[id] ?? '#CBD5E1';
};
