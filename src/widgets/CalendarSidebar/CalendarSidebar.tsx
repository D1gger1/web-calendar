import styles from './CalendarSidebar.module.scss';

export const CalendarSidebar = () => {
    return(
        <div className={styles.sidebar}>
            <button className={styles.createButton}>
                <span className="material-symbols-outlined">
                    add
                </span>Create
            </button>
        </div>
    )
}