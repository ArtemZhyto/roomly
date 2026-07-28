// Modules
import type { ReactNode } from 'react'

// Styles
import styles from './legal-layout.module.scss'

interface LegalLayoutProps {
  children: ReactNode
}

const LegalLayout = ({ children }: LegalLayoutProps) => {
  return (
    <main className={styles.layout}>
      <div className={styles.container}>{children}</div>
    </main>
  )
}

export default LegalLayout
