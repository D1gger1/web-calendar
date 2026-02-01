import styles from './EventInfoView.module.scss';
import { useEventStore } from '../../../entities/event/model/eventStore';
import { useCalendarStore } from '../../../entities/calendar/model/calendarStore';

interface Props {
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
}

export const EventInfoView = ({ onEdit, onDelete, onClose }: Props) => {
    const event = useEventStore((s) => s.selectedEvent);
    const calendars = useCalendarStore((s) => s.calendars);

    if (!event) return null;

    const currentCalendar = calendars.find(c => String(c.id) === String(event.calendarId));
    const calendarColor = currentCalendar?.color || '#CBD5E1';
    const calendarName = currentCalendar?.title || `Calendar ${event.calendarId}`;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3>Event information</h3>
                <div className={styles.actions}>
                    <button onClick={onEdit} className={styles.iconBtn} title="Edit">
                        <span className={styles.btnIcon}>✎</span>
                    </button>
                    
                    <button onClick={onDelete} className={styles.iconBtn} title="Delete">
                        <span className={styles.btnIcon}>🗑️</span>
                    </button>
                    
                    <button onClick={onClose} className={styles.iconBtn} title="Close">
                        <span className={styles.btnIcon}>✕</span>
                    </button>
                </div>
            </header>

            <div className={styles.content}>
                <h2 className={styles.title}>{event.title}</h2>

                <div className={styles.row}>
                    <span className={styles.icon}>🕒</span>
                    <div>
                        <p>
                            {event.date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}, {event.startTime} - {event.endTime}
                        </p>
                    </div>
                </div>

                <div className={styles.row}>
                    <span className={styles.icon}>📅</span>
                    <div className={styles.calendarTag}>
                        <span
                            className={styles.colorCircle}
                            style={{ backgroundColor: calendarColor }}
                        />
                        {calendarName}
                    </div>
                </div>

                {event.description && (
                    <div className={styles.row}>
                        <span className={styles.icon}>☰</span>
                        <p>{event.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};