import { useState } from 'react';
import type { SelectMenuProps } from './SelectMenu.types';
import styles from './SelectMenu.module.scss';

const generateTimeOptions = (): string[] => {
  const options: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const h = hour % 12 === 0 ? 12 : hour % 12;
      const suffix = hour < 12 ? 'AM' : 'PM';
      const m = minute.toString().padStart(2, '0');

      options.push(`${h}:${m} ${suffix}`);
    }
  }

  return options;
};

export const SelectMenu: React.FC<SelectMenuProps> = ({
  label,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const options = generateTimeOptions();

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={styles.dropdown}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <div className={styles.selected}>{value}</div>

        {open && (
          <div className={styles.menu}>
            {options.map((time) => (
              <div
                key={time}
                className={`${styles.option} ${
                  time === value ? styles.active : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(time);
                  setOpen(false);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
