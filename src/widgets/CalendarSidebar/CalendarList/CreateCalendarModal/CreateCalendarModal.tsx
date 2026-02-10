import { useState, useEffect } from 'react';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { ColorPicker } from '../../../../shared/ui/ColourPicker/ColorPicker';
import { useCalendarStore, type CalendarCategory } from '../../../../entities/calendar/model/calendarStore';
import { useNotificationStore } from '../../../../entities/notification/notificationStore';
import styles from './CreateCalendarModal.module.scss';
import imgColorPicker from '../../../../assets/ColorPicker.svg';
import imgTitle from '../../../../assets/title.png';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editData?: CalendarCategory;
};

export const CreateCalendarModal = ({ isOpen, onClose, editData }: Props) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#9F2957');

  const { calendars, addCalendar, updateCalendar } = useCalendarStore();
  const { showNotification } = useNotificationStore();

  const handleClose = () => {
    setTitle('');
    setColor('#9F2957');
    onClose();
  }

  const handleSave = () => {
    if (!title.trim()) return;

    if (editData) {
      updateCalendar(editData.id, title, color);
      showNotification('Calendar updated successfully');
      handleClose();
    } else {

      if (calendars.length >= 4) {
        showNotification('Maximum 4 calendars allowed');
        return;
      }

      addCalendar(title, color);
      showNotification('Calendar created successfully');
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setTitle(editData.title);
        setColor(editData.color);
      } else {
        setTitle('');
        setColor('#9F2957');
      }
    }
  }, [editData, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles.wrapper}>
      <h2 className={styles.header}>
        {editData ? 'Edit calendar' : 'Create calendar'}
      </h2>

      <div className={styles.containerTitle}>
        <label className={styles.labelTitle}>Title</label>
        <img src={imgTitle} alt="title" className={styles.imgTitle} />
        <input
          className={styles.inputTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>

      <div className={styles.containerColor}>
        <label className={styles.labelColor}>Color</label>
        <img src={imgColorPicker} alt="ColorPicker" className={styles.imgColor} />
        <ColorPicker
          value={color}
          onChange={setColor}
          className={styles.colorPicker}
        />
      </div>

      <div className={styles.footer}>
        <button className={styles.btnSave} onClick={handleSave}>
          {editData ? 'Update' : 'Save'}
        </button>
      </div>
    </Modal>
  );
};