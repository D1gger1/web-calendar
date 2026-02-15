import styles from './DayTimeline.module.scss';
import { useCalendarStore } from '../../entities/calendar/model/calendarStore';
import { useEventStore, getEventsForDate } from '../../entities/event/model/eventStore';
import { DayHeader } from './DayHeader';
import { TimeColumn } from './TimeColumn';
import { TimelineGrid } from './TimelineGrid';
import { EventBlock } from './EventBlock/EventBlock';
import { EventDetailsModal } from '../../features/eventDetails/EventDetailModal';
import { calculateEventLayout } from '../../features/dayTimeline/lib/calculateEventLayout';

export const DayTimeline = () => {
  const { calendars, currentDate } = useCalendarStore();
  const { events } = useEventStore();

  const dayEvents = getEventsForDate(events, currentDate);

  const visibleEvents = dayEvents.filter(event => {
    const parentCal = calendars.find(c => String(c.id) === String(event.calendarId));
    return parentCal ? parentCal.visible : true;
  });

  const allDayEvents = visibleEvents.filter(e => e.allDay);
  const timedEvents = visibleEvents.filter(e => !e.allDay);

  const layoutEvents = calculateEventLayout(timedEvents);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <DayHeader date={currentDate} />
        {allDayEvents.length > 0 && (
          <div className={styles.allDayContainer}>
            {allDayEvents.map((event) => {
              const targetCal = calendars.find(c => String(c.id) === String(event.calendarId));
              return (
                <EventBlock
                  key={event.id}
                  event={event}
                  calendarColor={targetCal?.color || '#CBD5E1'}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.scroll}>
        <TimeColumn />
        <div className={styles.timeline}>
          <TimelineGrid />
          {layoutEvents.map((event) => {
             const targetCal = calendars.find(c => String(c.id) === String(event.calendarId));
             return (
               <EventBlock
                 key={event.id}
                 event={event}
                 calendarColor={targetCal?.color || '#CBD5E1'}
               />
             );
          })}
        </div>
        <EventDetailsModal />
      </div>
    </div>
  );
};