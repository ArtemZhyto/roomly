// Styles
import styles from './layout.module.scss'

// Interfaces
import { LayoutT } from '@shared-types/layouts'

const AuthLayout = ({ children }: LayoutT) => {
  return <main className={styles.authLayout}>{children}</main>
}

export default AuthLayout
