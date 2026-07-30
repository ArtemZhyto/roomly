// Modules
import { ServerCrash } from 'lucide-react'

// Components
import ErrorPageActions from './ErrorPageActions'

// Styles
import styles from './ErrorPage.module.scss'

const ErrorPage = () => {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby='error-page-title'>
        <div className={styles.icon}>
          <ServerCrash size={30} strokeWidth={1.8} aria-hidden='true' />
        </div>

        <span className={styles.code}>Connection error</span>

        <h1 id='error-page-title' className={styles.title}>
          Roomly is temporarily unavailable
        </h1>

        <p className={styles.description}>
          We could not connect to the server. Please check your connection or try again in a moment.
        </p>

        <ErrorPageActions />
      </section>
    </main>
  )
}

export default ErrorPage
