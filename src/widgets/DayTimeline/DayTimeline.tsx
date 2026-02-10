import styles from './DayTimeline.module.scss';
import { useCalendarStore } from '../../entities/calendar/model/calendarStore';
import { useEventStore } from '../../entities/event/model/eventStore';
import { DayHeader } from './DayHeader';
import { TimeColumn } from './TimeColumn';
import { TimelineGrid } from './TimelineGrid';
import { EventBlock } from './EventBlock/EventBlock';
import { EventDetailsModal } from '../../features/eventDetails/EventDetailModal';
import { calculateEventLayout } from '../../features/dayTimeline/lib/calculateEventLayout';

export const DayTimeline = () => {

  const { calendars, currentDate } = useCalendarStore();
  const { events } = useEventStore();

  const isSameDay = (d1: Date, d2: Date) => {

    const date1 = d1 instanceof Date ? d1 : new Date(d1);
    const date2 = d2 instanceof Date ? d2 : new Date(d2);
    
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const dayEvents = events.filter((event) => isSameDay(event.date, currentDate));

  const visibleEvents = dayEvents.filter(event => {
    const parentCal = calendars.find(c => String(c.id) === String(event.calendarId));
    return parentCal ? parentCal.visible : true;
  });

  const layoutEvents = calculateEventLayout(visibleEvents);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <DayHeader date={currentDate} />
      </div>

      <div className={styles.scroll}>
        <TimeColumn />

        <div className={styles.timeline}>
          <TimelineGrid />

          {layoutEvents.map((event) => {
            const targetCal = calendars.find(c => String(c.id) === String(event.calendarId));
            const dynamicColor = targetCal ? targetCal.color : '#CBD5E1';

            return (
              <EventBlock
                key={event.id}
                event={event}
                calendarColor={dynamicColor}
              />
            );
          })}
        </div>
        <EventDetailsModal />
      </div>
    </div>
  );
};