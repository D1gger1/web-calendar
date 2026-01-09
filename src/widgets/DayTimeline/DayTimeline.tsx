import styles from './DayTimeline.module.scss';
import { useCalendarStore } from '../../entities/event/model/store';
import { DayHeader } from './DayHeader';
import { TimeColumn } from './TimeColumn';
import { TimelineGrid } from './TimelineGrid';

export const DayTimeline = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <DayHeader date={useCalendarStore((state) => state.currentDate)} />
      </div>
      <div className={styles.scroll}>
        <TimeColumn />
        <TimelineGrid />
      </div>
    </div>
  );
};
