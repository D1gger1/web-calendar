import styles from './CreateEventModal.module.scss';
import { useState } from 'react';
import { DatePicker } from '../../shared/ui/DatePicker/DatePicker';
import { SelectMenu } from '../../shared/ui/Select/SelectMenu';
import { CalendarSelect } from './CalendarSelect/CalendaarSelect';
import imgTitle from '../../assets/title.png';
import imgDate from '../../assets/Date.png';
import imgCalendar from '../../assets/calendar.png';
import imgDescript from '../../assets/description.png';



const repeatOptions = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly on Thursday' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'annually', label: 'Annually on November 2' },
] as const;

const calendars = [
    { id: '1', title: 'Calendar 1', color: '#FACC15' },
    { id: '2', title: 'Calendar 2', color: '#9333EA' },
    { id: '3', title: 'Calendar 3', color: '#BE123C' },
    { id: '4', title: 'Calendar 4', color: '#0D9488' },
];


export const CreateEventModal = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [allDay, setAllDay] = useState(false);
    const [repeat, setRepeat] = useState<'none' | 'daily' | 'weekly' | 'monthly' | 'annually'>('none');
    const [isRepeatOpen, setIsRepeatOpen] = useState(false);
    const [calendar, setCalendar] = useState(calendars[0]);


    return (
        <div className={styles.modal}>
            
            <div className={styles.containerTitle}>
                <label className={styles.labelTitle}>Title</label>
                <img src={imgTitle} alt="title" className={styles.titleImage} />
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.titleInput}
                />
            </div>

            <div className={styles.row}>
                <div className={styles.containerDate}>
                    <label className={styles.labelDate}>Date</label>
                    <img src={imgDate} alt="date" className={styles.dateImage} />
                    <div className={styles.dateInput} onClick={() => setIsCalendarOpen((v) => !v)}>
                        {date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>

                    {isCalendarOpen && (
                        <div className={styles.calendarPopover}>
                            <DatePicker
                                value={date}
                                onChange={(d) => {
                                    setDate(d);
                                    setIsCalendarOpen(false);
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.containerTime}>
                    <label className={styles.labelTime}>Time</label>

                    <div className={styles.timeRow}>
                        <SelectMenu value={startTime} onChange={setStartTime} />
                        <span className={styles.timeSeparator}>-</span>
                        <SelectMenu value={endTime} onChange={setEndTime} />
                    </div>
                </div>
            </div>

            <div className={styles.rowDay}>
                <label className={styles.labelCheckbox}>
                    <input
                        type="checkbox"
                        checked={allDay}
                        onChange={(e) => setAllDay(e.target.checked)}
                        className={styles.checkbox}
                    />
                    All day
                </label>

                <div className={styles.repeat}
                    onClick={() => setIsRepeatOpen(v => !v)}
                >

                    {repeatOptions.find((o) => o.value === repeat)?.label}
                    <span className="material-symbols-outlined">
                        stat_minus_1
                    </span>

                    {isRepeatOpen && (
                        <div className={styles.repeatMenu}>
                            {repeatOptions.map((option) => (
                                <div key={option.value} className={`${styles.repeatOption} ${option.value === repeat ? styles.active : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setRepeat(option.value);
                                        setIsRepeatOpen(false);
                                    }}
                                >
                                    {option.label}

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <div className={styles.containerCalendar}>
                <label className={styles.labelCalendar}>Calendar</label>
                <img src={imgCalendar} alt="calendar" className={styles.imgCalendar} />
                <CalendarSelect
                    value={calendar}
                    options={calendars}
                    onChange={setCalendar}
                />
            </div>

            <div className={styles.containerDescript}>
                <label className={styles.labelDescript}>Description</label>
                <img src={imgDescript} alt="decription" className={styles.imgDescript} />
                <textarea placeholder="Enter description" className={styles.txtDescript} />
            </div>

            <div className={styles.footer}>
                <button className={styles.btnSave}>Save</button>
            </div>
        </div>


    );

};
