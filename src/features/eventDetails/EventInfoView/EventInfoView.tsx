import styles from './EventInfoView.module.scss';
import { useEventStore } from '../../../entities/event/model/eventStore';

interface Props {
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
}

export const EventInfoView = ({ onEdit, onDelete, onClose }: Props) => {
    const event = useEventStore((s) => s.selectedEvent);

    if (!event) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3>Event information</h3>
                <div className={styles.actions}>
                    <button onClick={onEdit} className={styles.iconBtn} title="Edit">

                    </button>
                    <button onClick={onDelete} className={styles.iconBtn} title="Delete">
                        🗑️
                    </button>
                    <button onClick={onClose} className={styles.iconBtn}>
                        ✕
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
                        <p className={styles.subtext}>
                            {event.allDay ? 'All day' : ''} {event.repeat ? `, ${event.repeat}` : ''}
                        </p>
                    </div>
                </div>

                <div className={styles.row}>
                    <span className={styles.icon}>📅</span>
                    <div className={styles.calendarTag}>
                        <span
                            className={styles.colorCircle}
                            style={{ backgroundColor: getCalendarColor(event.calendarId) }}
                        />
                        {event.calendarName || `Calendar ${event.calendarId}`}
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

const getCalendarColor = (id: string) => {
  const map: Record<string, string> = {
    '1': '#FACC15',
    '2': '#9333EA',
    '3': '#BE123C',
    '4': '#0D9488',
  };
  return map[id] ?? '#CBD5E1';
};