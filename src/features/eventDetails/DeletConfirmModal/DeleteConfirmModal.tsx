import styles from './DeleteConfirmModal.module.scss';

interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal = ({ title, description, onConfirm, onCancel }: Props) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <button className={styles.closeBtn} onClick={onCancel}>✕</button>
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