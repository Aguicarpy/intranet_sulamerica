import styles from './Content.module.css'
import Calendar from '../Calendar/Calendar';

const Content = () => {
    return(
        <div className={styles.main}>
            <section className={styles.calendarSection}>
                <Calendar />
            </section>
            {/* <section className={styles.chatSection}>
                <Chat />
            </section>
            <section className={styles.quickAccessSection}>
                <QuickAccess />
            </section> */}
        </div>
    )
}   



export default Content;