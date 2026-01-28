import { useNotificationStore } from '../../../entities/notification/notificationStore';
import styles from './Toast.module.scss';

export const Toast = () => {
  const { message, isOpen, hideNotification } = useNotificationStore();

  if (!isOpen || !message) return null;

  return (
    <div className={styles.toast}>
      <span className={styles.message}>{message}</span>
      <button className={styles.closeBtn} onClick={hideNotification}>
        ✕
      </button>
    </div>
  );
};