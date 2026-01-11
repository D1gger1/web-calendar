import styles from './CalendarSidebar.module.scss';
import { ButtonCreate } from './ButtonCreate/ButtonCreate';
import { MiniCalendar } from './MiniCalendar/MiniCalendar';
import { CalendarList } from './CalendarList/CalendarList';

export const CalendarSidebar = () => {
    return(
        <div className={styles.sidebar}>
            <ButtonCreate />
            <MiniCalendar />
            <CalendarList />
        </div>
    )

}