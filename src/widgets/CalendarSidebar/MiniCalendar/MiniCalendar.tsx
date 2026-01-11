import { DatePicker } from "../../../shared/ui/DatePicker/DatePicker";
import { useCalendarStore } from "../../../entities/event/model/store";
import styles from "./MiniCalendar.module.scss";

export const MiniCalendar = () => {
    const currentDate = useCalendarStore((s) => s.currentDate);
    const setDate = useCalendarStore((s) => s.setDate);

    return(
        <div className={styles.miniCalendar}>
            <DatePicker value={currentDate} onChange={setDate} />
        </div>
    )

}
