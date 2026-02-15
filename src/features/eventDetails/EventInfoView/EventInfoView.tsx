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
    className?: string;
}

export const EventInfoView = ({ onEdit, onDelete, onClose, className }: Props) => {
    const event = useEventStore((s) => s.selectedEvent);
    const calendars = useCalendarStore((s) => s.calendars);

    if (!event) return null;

    const currentCalendar = calendars.find(c => String(c.id) === String(event.calendarId));
    const calendarColor = currentCalendar?.color || '#CBD5E1';
    const calendarName = currentCalendar?.title || `Calendar ${event.calendarId}`;

    const getRepeatLabel = (repeatValue: string, date: Date) => {
        if (repeatValue === 'none' || !repeatValue) return 'Does not repeat';
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        switch (repeatValue) {
            case 'daily': return 'Daily';
            case 'weekly': return `Weekly on ${dayName}`;
            case 'monthly': return 'Monthly';
            case 'annually': return `Annually on ${monthDay}`;
            default: return 'Does not repeat';
        }
    };

    return (
        <div className={`${styles.container} ${className || ''}`}>
            <header className={styles.header}>
                <h3 className={styles.titleHeader}>Event information</h3>
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
                <h2 className={styles.title}>
                    <img src={titleIcn} alt="Title" className={styles.iconTitle} />
                    {event.title}
                </h2>

                <div className={styles.row}>
                    <span className={styles.iconInfo}>
                        <img src={infoIcn} alt="Info" className={styles.infoIcon} />
                    </span>
                    <div className={styles.info}>
                        <p className={styles.dateText}>
                            {event.date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}

                            {event.allDay
                                ? ', All day'
                                : `, ${event.startTime} - ${event.endTime}`
                            }
                            {`, ${getRepeatLabel(event.repeat, event.date)}`}
                        </p>
                    </div>
                </div>

                <div className={styles.row}>
                    <span className={styles.icon}>
                        <img src={calendarIcn} alt="Calendar" className={styles.calendarIcon} />
                    </span>
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
                        <span className={styles.iconDescription}>
                            <img src={descrIcn} alt="Description" />
                        </span>
                        <p className={styles.description}>{event.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};