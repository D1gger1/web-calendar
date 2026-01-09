import styles from './DayHeader.module.scss';

interface DayHeaderProps {
  date: Date;
}

export const DayHeader = ({ date }: DayHeaderProps) => {
  const dayNumber = date.getDate();
  const weekDay = date
    .toLocaleDateString('en-US', { weekday: 'short' })
    .toUpperCase();

  return (
    <div className={styles.dayHeader}>
      <div className={styles.dayBadge}>
        <span className={styles.dayNumber}>{dayNumber}</span>
        <span className={styles.weekDay}>{weekDay}</span>
      </div>
    </div>
  );
};
