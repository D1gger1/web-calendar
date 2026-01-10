import { DayTimeline } from "../../widgets/DayTimeline/DayTimeline";
import styles from './DayPage.module.scss'  

export const DayPage = () => {
    return(
        <div className={styles.page}>
            <DayTimeline />
        </div>
    )
}