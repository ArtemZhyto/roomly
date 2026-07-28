// Components
import AuthBrandPanel from '@features/auth/components/AuthBrandPanel'

// Styles
import styles from './auth-layout.module.scss'

// Types
import { LayoutT } from '@shared-types/layout'

const AuthLayout = ({ children }: LayoutT) => {
  return (
    <main className={styles.layout}>
      <AuthBrandPanel />

      <section className={styles.formSection}>
        <div className={styles.formContainer}>{children}</div>
      </section>
    </main>
  )
}

export default AuthLayout
