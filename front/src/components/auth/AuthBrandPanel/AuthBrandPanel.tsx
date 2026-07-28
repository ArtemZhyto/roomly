// Modules
import Image from 'next/image'
import Link from 'next/link'

// Styles
import styles from './AuthBrandPanel.module.scss'

// Components
import FadeUpMotion from '@components-shared/FadeUpMotion'

const AuthBrandPanel = () => {
  return (
    <section className={styles.panel}>
      <FadeUpMotion x={-14} y={0} duration={0.45}>
        <Link href='/' className={styles.logo} aria-label='Roomly home'>
          <Image
            src='/icon.svg'
            alt=''
            width={42}
            height={42}
            className={`${styles.logoImage} select-none pointer-events-none`}
            priority
          />

          <span className={styles.logoText}>Roomly</span>
        </Link>
      </FadeUpMotion>

      <FadeUpMotion x={-20} y={0} delay={0.08} duration={0.55} className={styles.content}>
        <p className={styles.eyebrow}>Workspace booking platform</p>

        <h1 className={styles.title}>
          Your workspace,
          <br />
          perfectly scheduled.
        </h1>

        <p className={styles.description}>
          Find the right room, choose a time, and keep your team moving.
        </p>

        <div className={`${styles.schedulePreview} cursor-default select-none`} aria-hidden='true'>
          <div className={styles.scheduleHeader}>
            <div>
              <p className={styles.scheduleEyebrow}>This week</p>
              <p className={styles.scheduleTitle}>Room schedule</p>
            </div>

            <span className={styles.scheduleBadge}>5 rooms</span>
          </div>

          <div className={styles.scheduleDays}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
          </div>

          <div className={styles.scheduleGrid}>
            <div className={styles.dayColumn}>
              <span className={styles.bookingPrimary}>
                <strong>Design review</strong>
                <small>10:00–11:00</small>
              </span>
            </div>

            <div className={styles.dayColumn}>
              <span className={styles.bookingSecondary}>
                <strong>Team sync</strong>
                <small>12:30–13:30</small>
              </span>
            </div>

            <div className={styles.dayColumn}>
              <span className={styles.bookingMuted}>
                <strong>Planning</strong>
                <small>15:00–16:00</small>
              </span>
            </div>

            <div className={styles.dayColumn} />
          </div>
        </div>
      </FadeUpMotion>

      <FadeUpMotion y={10} delay={0.18} duration={0.4}>
        <ul className={styles.benefits}>
          <li>Simple</li>
          <li>Fast</li>
          <li>Conflict-free</li>
        </ul>
      </FadeUpMotion>
    </section>
  )
}

export default AuthBrandPanel
