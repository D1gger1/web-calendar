import styles from './DeleteConfirmModal.module.scss';
import closeBtn from '../../../assets/closeBtn.svg';

interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export const DeleteConfirmModal = ({ title, description, onConfirm, onCancel, className }: Props) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <button className={styles.closeBtn} onClick={onCancel}><img src={closeBtn} alt="Close" /></button>
      </header>

      <div className={styles.content}>
        <p>{description}</p>
      </div>

      <footer className={styles.footer}>
        <button className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.deleteBtn} onClick={onConfirm}>
          Delete
        </button>
      </footer>
    </div>
  );
};