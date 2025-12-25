import styles from '../Header.module.scss';

export const UserMenu = () => {
    return(
        <div className={styles.user}>
            <span className={styles.username}>Username</span>
            <span className={styles.avatar}>U</span>
        </div>
    )
}