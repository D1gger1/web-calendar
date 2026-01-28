import { Header } from '../widgets/Header/Header';
import { DayPage } from '../pages/dayPage/DayPage';
import { CalendarSidebar } from '../widgets/CalendarSidebar/CalendarSidebar';
import { Toast } from '../shared/ui/Toast/Toast';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.main}>
        <CalendarSidebar />
        <DayPage />
        <Toast/>
      </div>
    </div>
  );
}

export default App;
