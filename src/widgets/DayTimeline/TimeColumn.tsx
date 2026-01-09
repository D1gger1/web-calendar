import styles from './TimeColumn.module.scss';
import { HOURS, HOUR_HEIGHT } from './constants';

export const TimeColumn = () => {
  return(
    <div className={styles.column}>
      {HOURS.map(hour => (
        <div key={hour} className={styles.timeCell} style={{height: HOUR_HEIGHT}}>
          {formatHour(hour)}
        </div>
      ))}
    </div>
  );
};

function formatHour(hour: number){
  if(hour === 0) return '12 AM';
  if(hour < 12) return `${hour} AM`;
  if(hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}