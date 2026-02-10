import styles from './CreateEventModal.module.scss';
import { useState, useEffect, useRef } from 'react';
import { DatePicker } from '../../shared/ui/DatePicker/DatePicker';
import { SelectMenu } from '../../shared/ui/Select/SelectMenu';
import { CalendarSelect } from './CalendarSelect/CalendaarSelect';
import { useEventStore } from '../../entities/event/model/eventStore';
import { useCalendarStore } from '../../entities/calendar/model/calendarStore';
import { timeToMinutes } from '../../shared/lib/time';
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

interface CreateEventModalProps {
  isEditMode?: boolean;
  onClose: () => void;
}

export const CreateEventModal = ({ isEditMode = false, onClose }: CreateEventModalProps) => {
  const { calendars } = useCalendarStore();
  const createEvent = useEventStore((s) => s.createEvent);
  const updateEvent = useEventStore((s) => s.updateEvent);
  const selectedEvent = useEventStore((s) => s.selectedEvent);

  const [title, setTitle] = useState(isEditMode ? selectedEvent?.title || '' : '');
  const [date, setDate] = useState(isEditMode ? selectedEvent?.date || new Date() : new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startTime, setStartTime] = useState(isEditMode ? selectedEvent?.startTime || '' : '');
  const [endTime, setEndTime] = useState(isEditMode ? selectedEvent?.endTime || '' : '');
  const [allDay, setAllDay] = useState(isEditMode ? selectedEvent?.allDay || false : false);
  const [repeat, setRepeat] = useState<any>(isEditMode ? selectedEvent?.repeat || 'none' : 'none');
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);
  const [description, setDescription] = useState(isEditMode ? selectedEvent?.description || '' : '');

  const initialCalendar = isEditMode
    ? calendars.find(c => String(c.id) === String(selectedEvent?.calendarId)) || calendars[0]
    : calendars[0];

  const [calendar, setCalendar] = useState(initialCalendar);

  const [timeError, setTimeError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const dateRef = useRef<HTMLDivElement | null>(null);
  const repeatRef = useRef<HTMLDivElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleEndTimeChange = (v: string) => {
    setEndTime(v);
    setTimeError(null);
  };

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      titleInputRef.current?.focus();
      return;
    }

    if (!calendar) {
      setSaveError('Please select a calendar');
      return;
    }

    if (!allDay && (!startTime || !endTime)) {
      setTimeError('Choose time is required');
      return;
    }

    if (!allDay && timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      setTimeError('End time must be later than start time');
      return;
    }

    const eventData = {
      title,
      date,
      startTime,
      endTime,
      allDay,
      repeat,
      calendarId: String(calendar.id),
      description,
    };

    const result = isEditMode && selectedEvent
      ? updateEvent(selectedEvent.id, eventData)
      : createEvent(eventData);

    if (!result.ok) {
      setSaveError(result.error);
      return;
    }

    setSaveError(null);
    if (typeof onClose === 'function') {
      onClose()
    }
  };

  useEffect(() => {
    if (isEditMode && selectedEvent) {
      setTitle(selectedEvent.title);
      setDate(selectedEvent.date);
      setStartTime(selectedEvent.startTime || '');
      setEndTime(selectedEvent.endTime || '');
      setAllDay(selectedEvent.allDay || false);
      setRepeat(selectedEvent.repeat || 'none');
      setDescription(selectedEvent.description || '');

      const currentCal = calendars.find(c => String(c.id) === String(selectedEvent.calendarId));
      if (currentCal) setCalendar(currentCal);
    }
  }, [isEditMode, selectedEvent, calendars]);

  useEffect(() => {
    if (!calendar && calendars.length > 0) {
      setCalendar(calendars[0]);
    }
  }, [calendars, calendar]);

  return (
    <div
      className={styles.modal}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSave();
        }
      }}
    >
      <h2 className={styles.title}>{isEditMode ? 'Edit event' : 'Create event'}</h2>

      <div className={styles.containerTitle}>
        <label className={styles.labelTitle}>Title</label>
        <img src={imgTitle} alt="title" className={styles.titleImage} />
        <input
          ref={titleInputRef}
          className={styles.titleInput}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (titleError) setTitleError(null);
          }}
          placeholder="Enter title"
        />
        {titleError && <div className={styles.error}>{titleError}</div>}
      </div>

      <div className={styles.row}>
        <div className={styles.containerDate}>
          <label className={styles.labelDate}>Date</label>
          <img src={imgDate} alt="date" className={styles.dateImage} />
          <div
            className={styles.dateInput}
            onClick={() => setIsCalendarOpen((v) => !v)}
          >
            {date.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </div>

          {isCalendarOpen && (
            <div className={styles.calendarPopover} ref={dateRef}>
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
            <SelectMenu value={startTime} onChange={handleStartTimeChange} disabled={allDay} />
            <span className={styles.timeSeparator}>–</span>
            <SelectMenu value={endTime} onChange={handleEndTimeChange} disabled={allDay} />
          </div>
          {timeError && <div className={styles.timeError}>{timeError}</div>}
        </div>
      </div>

      <div className={styles.rowDay}>
        <label className={styles.labelCheckbox}>
          <input
            type="checkbox"
            checked={allDay}
            onChange={(e) => {
              const checked = e.target.checked;
              setAllDay(checked);
              if (checked) {
                setStartTime('');
                setEndTime('');
                setTimeError(null);
              }
            }}
          />
          All day
        </label>

        <div
          ref={repeatRef}
          className={styles.repeat}
          onClick={() => setIsRepeatOpen((v) => !v)}
        >
          {repeatOptions.find((o) => o.value === repeat)?.label}

          {isRepeatOpen && (
            <div className={styles.repeatMenu}>
              {repeatOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.repeatOption} ${option.value === repeat ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setRepeat(option.value as any);
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
          onChange={(option) => {
            const found = calendars.find((c) => String(c.id) === String(option.id));
            if (found) setCalendar(found);
          }}
        />
      </div>

      <div className={styles.containerDescript}>
        <label className={styles.labelDescript}>Description</label>
        <img src={imgDescript} alt="description" className={styles.imgDescript} />
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