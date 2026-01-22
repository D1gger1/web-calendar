import styles from './TimeColumn.module.scss';
import { START_HOUR, HOURS_IN_VIEW, HOUR_HEIGHT } from './constants';

export const TimeColumn = () => {
  return (
    <div className={styles.column}>
      {Array.from({ length: HOURS_IN_VIEW }, (_, i) => {
        const hour = START_HOUR + i;

        const label =
          hour === 0
            ? '12 AM'
            : hour < 12
            ? `${hour} AM`
            : hour === 12
            ? '12 PM'
            : `${hour - 12} PM`;

        return (
          <div
            key={hour}
            className={styles.hour}
            style={{ height: HOUR_HEIGHT }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};
