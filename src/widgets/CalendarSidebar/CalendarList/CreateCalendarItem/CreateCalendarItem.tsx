import styles from './CreateCalendarItem.module.scss';

type Props = {
  onClick: () => void;
};

export const CreateCalendarItem = ({ onClick }: Props) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      aria-label="Add calendar"
    >
      +
    </button>
  );
};
