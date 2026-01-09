import styles from './TimelineGrid.module.scss';
import { HOURS, HOUR_HEIGHT } from './constants';

export const TimelineGrid = () => {
  return (
    <div className={styles.grid}>
      {HOURS.map((hour) => (
        <div key={hour} className={styles.hour} style={{ height: HOUR_HEIGHT }} />
      ))}
    </div>
  );
};
