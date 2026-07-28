// Styles
import styles from './AuthBrandPanel.module.scss'

const SchedulePreview = () => {
  return (
    <section className={styles.schedulePreview} aria-label='Room schedule preview'>
      <header className={styles.scheduleHeader}>
        <div>
          <p className={styles.scheduleLabel}>Today</p>
          <h3 className={styles.scheduleTitle}>Meeting schedule</h3>
        </div>

        <span className={styles.scheduleBadge}>3 rooms free</span>
      </header>

      <div className={styles.scheduleList}>
        <article className={styles.scheduleItem}>
          <time className={styles.scheduleTime}>09:30</time>

          <div className={styles.scheduleDetails}>
            <p className={styles.scheduleName}>Product sync</p>
            <p className={styles.scheduleRoom}>Atlas Room · 6 people</p>
          </div>

          <span className={styles.scheduleStatus}>Now</span>
        </article>

        <article className={styles.scheduleItem}>
          <time className={styles.scheduleTime}>11:00</time>

          <div className={styles.scheduleDetails}>
            <p className={styles.scheduleName}>Design review</p>
            <p className={styles.scheduleRoom}>Nova Room · 4 people</p>
          </div>
        </article>

        <article className={styles.scheduleItem}>
          <time className={styles.scheduleTime}>14:30</time>

          <div className={styles.scheduleDetails}>
            <p className={styles.scheduleName}>Weekly planning</p>
            <p className={styles.scheduleRoom}>Orbit Room · 8 people</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default SchedulePreview
