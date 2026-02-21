import styles from './CreateEventModal.module.scss';
import { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../../shared/ui/DatePicker/DatePicker';
import { SelectMenu } from '../../shared/ui/Select/SelectMenu';
import { CalendarSelect } from './CalendarSelect/CalendaarSelect';
import { useEventStore } from '../../entities/event/model/eventStore';
import { useCalendarStore } from '../../entities/calendar/model/calendarStore';
import { timeToMinutes } from '../../shared/lib/time';
import type { CalendarCategory } from '../../entities/calendar/model/calendarStore';

import imgTitle from '../../assets/title.png';
import imgDate from '../../assets/Date.png';
import imgCalendar from '../../assets/calendar.png';
import imgDescript from '../../assets/description.png';
import closeBtn from '../../assets/closeBtn.svg';
interface CreateEventModalProps {
  isEditMode?: boolean;
  onClose: () => void;
  className?: string;
}

export const CreateEventModal = ({
  isEditMode = false,
  onClose,
  className,
}: CreateEventModalProps) => {
  const { calendars } = useCalendarStore();
  const { events } = useEventStore();
  const createEvent = useEventStore((s) => s.createEvent);
  const updateEvent = useEventStore((s) => s.updateEvent);
  const selectedEvent = useEventStore((s) => s.selectedEvent);

  const [title, setTitle] = useState(
    isEditMode ? selectedEvent?.title || '' : ''
  );

  const [date, setDate] = useState(
    isEditMode ? selectedEvent?.date || new Date() : new Date()
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [startTime, setStartTime] = useState(
    isEditMode ? selectedEvent?.startTime || '10:00 AM' : '10:00 AM'
  );

  const [endTime, setEndTime] = useState(
    isEditMode ? selectedEvent?.endTime || '10:30 AM' : '10:30 AM'
  );

  const [allDay, setAllDay] = useState(
    isEditMode ? selectedEvent?.allDay || false : false
  );

  const [repeat, setRepeat] = useState<string>(
    isEditMode ? selectedEvent?.repeat || 'none' : 'none'
  );

  const [isRepeatOpen, setIsRepeatOpen] = useState(false);

  const [description, setDescription] = useState(
    isEditMode ? selectedEvent?.description || '' : ''
  );

  const [calendar, setCalendar] = useState<CalendarCategory>(
    isEditMode && selectedEvent
      ? calendars.find(c => String(c.id) === String(selectedEvent.calendarId)) || calendars[0]
      : calendars[0]
  );

  const [timeError, setTimeError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const repeatRef = useRef<HTMLDivElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!calendar && calendars.length) {
      setCalendar(calendars[0]);
    }
  }, [calendars, calendar]);

  const getRepeatOptions = (selectedDate: Date) => {
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    return [
      { value: 'none', label: 'Does not repeat' },
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: `Weekly on ${dayName}` },
      { value: 'monthly', label: 'Monthly' },
      { value: 'annually', label: `Annually on ${monthDay}` },
    ];
  };

  const repeatOptions = getRepeatOptions(date);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (repeatRef.current && !repeatRef.current.contains(event.target as Node)) {
        setIsRepeatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addMinutes = (time: string, minutes: number) => {
    const total = timeToMinutes(time) + minutes;
    const h = Math.floor(total / 60) % 24;
    const m = total % 60;
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const suffix = h < 12 ? 'AM' : 'PM';
    return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
  };

  const handleStartTimeChange = (v: string) => {
    setStartTime(v);
    setTimeError(null);
    if (!endTime || timeToMinutes(endTime) <= timeToMinutes(v)) {
      setEndTime(addMinutes(v, 30));
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      titleInputRef.current?.focus();
      return;
    }

    if (allDay) {
      const hasAllDayEvent = events.some(e =>
        e.allDay &&
        new Date(e.date).toDateString() === date.toDateString() &&
        (isEditMode ? e.id !== selectedEvent?.id : true)
      );

      if (hasAllDayEvent) {
        setSaveError('An "All day" event already exists for this day');
        return;
      }
    }

    if (!allDay && timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      setTimeError('End time must be later than start time');
      return;
    }

    const eventData = {
      title,
      date,
      startTime: allDay ? '' : startTime,
      endTime: allDay ? '' : endTime,
      allDay,
      repeat: repeat as any,
      calendarId: String(calendar.id),
      description,
    };

    const result =
      isEditMode && selectedEvent
        ? updateEvent(selectedEvent.id, eventData)
        : createEvent(eventData);

    if (result.ok) onClose();
    else setSaveError(result.error);
  };

  if (!calendars.length) {
    return (
      <div className={styles.modal}>
        <div className={styles.createError}>
          Please create a calendar first
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.modal} ${className || ''}`} onKeyDown={(e) => e.key === 'Enter' && handleSave()}>
      <div className={styles.header}>
        <h2 className={styles.title}>{isEditMode ? 'Edit event' : 'Create event'}</h2>
        <img src={closeBtn} alt="Close" onClick={onClose} className={styles.closeBtn} />
      </div>

      {!calendars.length && (
        <div className={styles.saveError}>
          Please create a calendar first
        </div>
      )}

      <div className={styles.containerTitle}>
        <label className={styles.labelTitle}>Title</label>
        <img src={imgTitle} alt="" className={styles.titleImage} />
        <input
          ref={titleInputRef}
          className={styles.titleInput}
          value={title}
          onChange={(e) => { setTitle(e.target.value); setTitleError(null); }}
          placeholder="Enter title"
        />
        {titleError && <div className={styles.error}>{titleError}</div>}
      </div>

      <div className={styles.row}>
        <div className={styles.containerDate}>
          <label className={styles.labelDate}>Date</label>
          <img src={imgDate} alt="" className={styles.dateImage} />
          <div className={styles.dateInput} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
            {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
          {isCalendarOpen && (
            <div className={styles.calendarPopover}>
              <DatePicker value={date} onChange={(d) => { setDate(d); setIsCalendarOpen(false); }} />
            </div>
          )}
        </div>

        <div className={styles.containerTime}>
          <label className={styles.labelTime}>Time</label>
          <div className={styles.timeRow}>
            <SelectMenu value={startTime} onChange={handleStartTimeChange} disabled={allDay} />
            <span className={styles.timeSeparator}>-</span>
            <SelectMenu value={endTime} onChange={(v) => { setEndTime(v); setTimeError(null); }} disabled={allDay} />
          </div>
          {timeError && <div className={styles.timeError}>{timeError}</div>}
        </div>
      </div>

      <div className={styles.rowDay}>
        <label className={styles.labelCheckbox}>
          <input type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} className={styles.checkboxInput} />
          <span className={styles.checkmark}></span>
          All day
        </label>

        <div ref={repeatRef} className={styles.repeat} onClick={() => setIsRepeatOpen(!isRepeatOpen)}>
          {repeatOptions.find((o) => o.value === repeat)?.label}
          <span className={`material-symbols-outlined ${isRepeatOpen ? styles.rotate : ''}`}>
            keyboard_arrow_down
          </span>
          {isRepeatOpen && (
            <div className={styles.repeatMenu}>
              {repeatOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.repeatOption} ${option.value === repeat ? styles.active : ''}`}
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
        <img src={imgCalendar} alt="" className={styles.imgCalendar} />
        <CalendarSelect
          value={calendar}
          options={calendars}
          onChange={(opt) =>
            setCalendar(
              calendars.find((c) => String(c.id) === String(opt.id)) || calendars[0]
            )
          }
        />
      </div>

      <div className={styles.containerDescript}>
        <label className={styles.labelDescript}>Description</label>
        <img src={imgDescript} alt="" className={styles.imgDescript} />
        <textarea
          className={styles.txtDescript}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>

      <div className={styles.footer}>
        {saveError && <div className={styles.saveError}>{saveError}</div>}
        <button className={styles.btnSave} onClick={handleSave}>
          {isEditMode ? 'Save' : 'Create'}
        </button>
      </div>
    </div>
  );
};