import styles from './Content.module.css'
import Calendar from '../Calendar/Calendar';
import ChatApp from '../Chat/Chat';

const Content = () => {
    return(
        <div className={styles.main}>
            <section className={styles.calendarSection}>
                <Calendar />
            </section>
            <section>
                <ChatApp />
            </section>
            {/* <section className={styles.quickAccessSection}>
                <QuickAccess />
            </section> */}
        </div>
    )
}   



export default Content;