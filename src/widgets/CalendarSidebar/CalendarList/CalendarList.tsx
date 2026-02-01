import styles from './CalendarList.module.scss';
import { useState } from 'react';
import { CalendarItem } from './CalendarItem';
import { CreateCalendarItem } from './CreateCalendarItem/CreateCalendarItem';
import { CreateCalendarModal } from './CreateCalendarModal/CreateCalendarModal';
import { useCalendarStore } from '../../../entities/calendar/model/calendarStore';

export const CalendarList = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const calendars = useCalendarStore((state) => state.calendars);

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <div className={styles.title}>My calendars</div>
                <CreateCalendarItem onClick={() => setIsCreateOpen(true)} />
            </div>

            <div className={styles.itemsContainer}>
                {calendars.length > 0 ? (
                    calendars.map((cal) => (
                        <CalendarItem
                            key={cal.id}
                            calendar={cal} 
                        />
                    ))
                ) : (
                    <div className={styles.empty}>No calendars created</div>
                )}
            </div>

            <CreateCalendarModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
        </div>
    );
};