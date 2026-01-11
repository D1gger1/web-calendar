import styles from './ButtonCreate.module.scss';

export const ButtonCreate = () => {
    return (
        <div className={styles.sidebar}>
            <button className={styles.createButton}>
                <span className="material-symbols-outlined">
                    add
                </span>Create
            </button>
        </div>
    )
}