import styles from './EventInfoView.module.scss';
import { useEventStore } from '../../../entities/event/model/eventStore';
import { useCalendarStore } from '../../../entities/calendar/model/calendarStore';
import closeBtn from '../../../assets/closeBtn.svg';
import editBtn from '../../../assets/editIcon.svg';
import deleteBtn from '../../../assets/dltIcn.svg';
import titleIcn from '../../../assets/title.png';
import infoIcn from '../../../assets/infoIcon.svg';
import calendarIcn from '../../../assets/calendar.png';
import descrIcn from '../../../assets/description.png';

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
                <h3 className={styles.title}>Event information</h3>
                <div className={styles.actions}>
                    <button onClick={onEdit} className={styles.editBtn} title="Edit">
                        <span className={styles.btnIcon}><img src={editBtn} alt="Edit" /></span>
                    </button>

                    <button onClick={onDelete} className={styles.deleteBtn} title="Delete">
                        <span className={styles.btnIcon}><img src={deleteBtn} alt="Delete" /></span>
                    </button>

                    <button onClick={onClose} className={styles.closeBtn} title="Close">
                        <span className={styles.btnIcon}><img src={closeBtn} alt="Close" /></span>
                    </button>
                </div>
            </header>
            <div className={styles.content}>
                <h2 className={styles.title}><img src={titleIcn} alt="Title" />{event.title}</h2>

                <div className={styles.row}>
                    <span className={styles.icon}><img src={infoIcn} alt="Info" /></span>
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
                    <span className={styles.icon}><img src={calendarIcn} alt="Calendar" /></span>
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
                        <span className={styles.icon}><img src={descrIcn} alt="Description" /></span>
                        <p>{event.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};