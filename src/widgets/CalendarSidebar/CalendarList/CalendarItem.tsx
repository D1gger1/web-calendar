import { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal/Modal';
import styles from './CalendarItem.module.scss';
import { useCalendarStore, type CalendarCategory } from '../../../entities/calendar/model/calendarStore';
import { useNotificationStore } from '../../../entities/notification/notificationStore';
import { DeleteConfirmModal } from '../../../features/eventDetails/DeletConfirmModal/DeleteConfirmModal';
import { CreateCalendarModal } from './CreateCalendarModal/CreateCalendarModal';

interface CalendarItemProps {
  calendar: CalendarCategory;
}

export const CalendarItem = ({ calendar }: CalendarItemProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleVisibility = useCalendarStore((state) => state.toggleVisibility);
  const deleteCalendar = useCalendarStore((state) => state.deleteCalendar);
  const showNotification = useNotificationStore((state) => state.showNotification);

  const handleDelete = () => {
    deleteCalendar(calendar.id);
    showNotification('Calendar deleted');
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className={styles.item}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={calendar.visible}
          onChange={() => toggleVisibility(calendar.id)}
          style={{ accentColor: calendar.color }}
        />

        <span
          className={styles.colorCircle}
          style={{ backgroundColor: calendar.color }}
        />

        <span className={styles.name}>{calendar.title}</span>

        <div className={styles.actions}>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className={styles.editBtn}
            title="Edit"
          >
            ✎
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className={styles.deleteBtn}
            title="Delete"
          >
            🗑
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
            description={`Are you sure you want to delete "${calendar.title}"?`}
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};