import styles from '../Header.module.scss';
import headerLogo from '../../../assets/headerLogo.png'

export const Logo = () => {
    return(
        <div className={styles.logo}>
            <span className={styles.logoIcon}><img src={headerLogo} alt="Logo" /></span>
            <span className={styles.logoText}>WebCalendar</span>
        </div>
    )
}