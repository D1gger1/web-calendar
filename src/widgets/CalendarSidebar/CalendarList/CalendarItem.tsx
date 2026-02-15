import { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { useEventStore } from '../../../entities/event/model/eventStore';
import { useCalendarStore, type CalendarCategory } from '../../../entities/calendar/model/calendarStore';
import { useNotificationStore } from '../../../entities/notification/notificationStore';
import { DeleteConfirmModal } from '../../../features/eventDetails/DeletConfirmModal/DeleteConfirmModal';
import { CreateCalendarModal } from './CreateCalendarModal/CreateCalendarModal';
import deleteIcon from '../../../assets/dltIcn.svg';
import editIcon from '../../../assets/editIcon.svg';
import styles from './CalendarItem.module.scss';

interface CalendarItemProps {
  calendar: CalendarCategory;
}

export const CalendarItem = ({ calendar }: CalendarItemProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleVisibility = useCalendarStore((state) => state.toggleVisibility);
  const deleteCalendar = useCalendarStore((state) => state.deleteCalendar);
  const deleteEventsByCalendar = useEventStore((state) => state.deleteEventsByCalendarId);
  const showNotification = useNotificationStore((state) => state.showNotification);

  const handleDelete = () => {
    deleteEventsByCalendar(calendar.id);
    deleteCalendar(calendar.id);
    showNotification('Calendar deleted');
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.item}>
          <label className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              className={styles.realCheckbox}
              checked={calendar.visible}
              onChange={() => toggleVisibility(calendar.id)}
            />
            <span
              className={styles.customCheckmark}
              style={{
                backgroundColor: calendar.visible ? calendar.color : 'transparent',
                borderColor: calendar.color
              }}
            >
              {calendar.visible && <div className={styles.tick} />}
            </span>
          </label>


          <span className={styles.name}>{calendar.title}</span>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className={styles.deleteBtn}
            title="Delete"
          >
            <img src={deleteIcon} alt="Delete" />
          </button>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className={styles.editBtn}
            title="Edit"
          >
            <img src={editIcon} alt="Edit" />
          </button>

        </div>
      </div>

      {isEditModalOpen && (
        <CreateCalendarModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          editData={calendar}
        />
      )}

      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} className={styles.modal}>
          <DeleteConfirmModal
            title="Delete Calendar"
            description={`Are you sure you want to delete ${calendar.title}? You'll no longer have access to this calendar and its events.`}
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};