
import { Header } from '../widgets/Header/Header'
import { DayPage } from '../pages/dayPage/DayPage'
import styles from './App.module.scss'

function App() {


  return (
    <div className={styles.app}>
      <Header></Header>
      <DayPage></DayPage>
    </div>
  )
}

export default App
