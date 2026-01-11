import styles from './CalendarList.module.scss';
import { CalendarItem } from './CalendarItem';

export const CalendarList = () => {
    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <div className={styles.title}>My calendars</div>
                <button className={styles.add}>
                    <span className="material-symbols-outlined">
                        add
                    </span>
                </button>
            </div>
            <CalendarItem />
            <CalendarItem />
            <CalendarItem />
        </div>

    )
}