import { DatePicker } from "../../../shared/ui/DatePicker/DatePicker";
import { useCalendarStore } from "../../../entities/calendar/model/calendarStore";
import styles from "./MiniCalendar.module.scss";

export const MiniCalendar = () => {
    const { currentDate, setCurrentDate } = useCalendarStore();

    return(
        <div className={styles.miniCalendar}>
            <DatePicker value={currentDate} onChange={setCurrentDate} />
        </div>
    )

}
