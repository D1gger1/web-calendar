import styles from './DeleteConfirmModal.module.scss';
import { useEventStore } from '../../../entities/event/model/eventStore';
import { useNotificationStore } from '../../../entities/notification/notificationStore';

interface Props {
  eventTitle: string;
  onConfirm: () => void; 
  onCancel: () => void;
}

export const DeleteConfirmModal = ({ eventTitle, onConfirm, onCancel }: Props) => {
  const selectedEvent = useEventStore((s) => s.selectedEvent);
  const deleteEvent = useEventStore((s) => s.deleteEvent);

  const showNotificaion = useNotificationStore((s) => s.showNotification);

  const handleDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      showNotificaion('Event Deleted')
      onConfirm(); 
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Delete event</h2>
        <button className={styles.closeBtn} onClick={onCancel}>✕</button>
      </header>

      <div className={styles.content}>
        <p>
          Are you sure you want to delete Event <strong>{eventTitle}</strong>? 
          You'll no longer have access to it.
        </p>
      </div>

      <footer className={styles.footer}>
        <button className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </footer>
    </div>
  );
};