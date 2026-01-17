import { useState } from 'react';
import styles from './CalendarSelect.module.scss';
import type { CalendarSelectProps } from './CalendarSelect.types';



export const CalendarSelect = ({
  value,
  options,
  onChange,
}: CalendarSelectProps) => {

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.select}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <div className={styles.left}>
          <span
            className={styles.color}
            style={{ backgroundColor: value.color }}
          />
          <span className={styles.title}>{value.title}</span>
        </div>

        <span className="material-symbols-outlined">
          keyboard_arrow_down
        </span>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {options.map((calendar) => (
            <div
              key={calendar.id}
              className={`${styles.option} ${calendar.id === value.id ? styles.active : ''
                }`}
              onClick={(e) => {
                e.stopPropagation();
                onChange(calendar);
                setOpen(false);
              }}
            >
              <span
                className={styles.color}
                style={{ backgroundColor: calendar.color }}
              />
              <span className={styles.title}>{calendar.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
