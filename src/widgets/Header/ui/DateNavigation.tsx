import styles from "../Header.module.scss"
import { Button } from "../../../shared/ui/Button/Button"
import { useCalendarStore } from "../../../entities/calendar/model/calendarStore"

export const DateNavigation = () => {
    // Достаем setCurrentDate (вместо старого setDate)
    const { currentDate, nextDay, prevDay, setCurrentDate } = useCalendarStore();

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className={styles.dateNav}>
            {/* ИСПРАВЛЕНИЕ: вызываем setCurrentDate и передаем НОВЫЙ объект даты */}
            <Button 
                label='' 
                onClick={() => setCurrentDate(new Date())} 
                className={styles.btnToday}
            >
                Today
            </Button>

            <Button className={styles.btnPrev} label='' onClick={prevDay}>
                <span className="material-symbols-outlined">
                    keyboard_arrow_left
                </span>
            </Button>

            <Button className={styles.btnNext} label='' onClick={nextDay}>
                <span className="material-symbols-outlined">
                    keyboard_arrow_right
                </span>
            </Button>

            <span className={styles.date}>{formattedDate}</span>
        </div>
    )
}