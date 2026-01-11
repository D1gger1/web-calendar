import styles from './CalendarItem.module.scss';

export const CalendarItem = () => {
    return (
        <div className={styles.item}>
            <input type="checkbox" defaultChecked />
            <span className={styles.color} />
            <span className={styles.name}>Work</span>
        </div>
    )
}