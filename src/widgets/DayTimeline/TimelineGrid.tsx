import styles from './TimelineGrid.module.scss';
import { HOURS_IN_VIEW, HOUR_HEIGHT } from './constants';

export const TimelineGrid = () => {
  return (
    <div className={styles.grid}>
      <div style={{ height: HOUR_HEIGHT }} />

      {Array.from({ length: HOURS_IN_VIEW }).map((_, i) => (
        <div
          key={i}
          className={styles.hour}
          style={{ height: HOUR_HEIGHT }}
        />
      ))}
    </div>
  );
};