import styles from './CalendarList.module.scss';
import { useState } from 'react'
import { CalendarItem } from './CalendarItem';
import { CreateCalendarItem } from './CreateCalendarItem/CreateCalendarItem'
import { CreateCalendarModal } from './CreateCalendarModal/CreateCalendarModal';
;

export const CalendarList = () => {

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <div className={styles.title}>My calendars</div>
                <button className={styles.add}>
                    <CreateCalendarItem onClick={() => {
                        setIsCreateOpen(true)
                    }} />
                </button>
            </div>
            <CalendarItem />
            <CalendarItem />
            <CalendarItem />

            <CreateCalendarModal isOpen={isCreateOpen} onClose={() => { setIsCreateOpen(false) }} />
        </div>



    )
}