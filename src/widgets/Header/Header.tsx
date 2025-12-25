import { Logo } from './ui/Logo';
import { DateNavigation } from './ui/DateNavigation';
import { UserMenu } from './ui/UserMenu';

import styles from './Header.module.scss'

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Logo />
                <DateNavigation />
            </div>
            <div className={styles.right}>
                
                <UserMenu />
            </div>
        </header>
    )
}