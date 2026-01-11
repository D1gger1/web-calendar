import React, { useState } from 'react';
import type { DatePickerProps } from './DatePicker.types';
import styles from './DatePicker.module.scss';

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [viewDate, setViewDate] = useState(value || new Date());

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const offset = (firstDay + 7) % 7;
    const firstVisibleDate = new Date(year, month, 1 - offset);

    const dates: Date[] = [];
    for (let i = 0; i < 42; i++) {
        const d = new Date(firstVisibleDate);
        d.setDate(firstVisibleDate.getDate() + i);
        dates.push(d);
    }

    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <span className={styles.monthLabel}>
                    {viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <div className={styles.arrows}>
                    <button onClick={prevMonth}><span className="material-symbols-outlined ">
                        keyboard_arrow_left
                    </span></button>
                    <button onClick={nextMonth}><span className="material-symbols-outlined nextMonth">
                        keyboard_arrow_right
                    </span></button>
                </div>
            </div>

            <div className={styles.weekdays}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((w) => (
                    <div key={w}>{w}</div>
                ))}
            </div>

            <div className={styles.gridDays}>
                {dates.map((d) => {
                    const inMonth = d.getMonth() === month;
                    const selected = value && isSameDay(d, value);

                    return (
                        <button
                            key={d.toISOString()}
                            className={`
                ${styles.cell}
                ${!inMonth ? styles.outside : ''}
                ${selected ? styles.selected : ''}
              `}
                            onClick={() => onChange(d)}
                        >
                            {d.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
