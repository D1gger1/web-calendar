import styles from './TimeColumn.module.scss';
import { START_HOUR, HOURS_IN_VIEW, HOUR_HEIGHT } from './constants';

export const TimeColumn = () => {
  const formatLabel = (hour: number) => {
    const h = hour % 24;
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  };

  return (
    <div className={styles.column}>
      <div style={{ height: HOUR_HEIGHT }} />
      {Array.from({ length: HOURS_IN_VIEW }, (_, i) => {
        const hour = START_HOUR + i;

        return (
          <div
            key={hour}
            className={styles.timeMarker}
            style={{ top: (i + 1) * HOUR_HEIGHT }}
          >
            <span className={styles.label}>{formatLabel(hour)}</span>
          </div>
        );
      })}
    </div>
  );
};