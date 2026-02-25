import styles from "../Header.module.scss";
import { Button } from "../../../shared/ui/Button/Button";
import { useCalendarStore } from "../../../entities/calendar/model/calendarStore";
import { formatDateFull } from "../../../shared/lib/date";

export const DateNavigation = () => {
    const { currentDate, nextDay, prevDay, setCurrentDate } = useCalendarStore();

    const formattedDate = formatDateFull(currentDate);

    return (
        <div className={styles.dateNav}>
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
    );
};