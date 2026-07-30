// Components
import AppSidebar from '@components/layout/AppSidebar'
import MobileAppHeader from '@components/layout/MobileAppHeader'

// Types
import type { LayoutT } from '@shared-types/layout'

// Styles
import styles from './dashboard-layout.module.scss'

//! TEMP
const dashboardUser = {
  id: 1,
  name: 'Alex Morgan',
  email: 'alex@roomly.ua',
  emailVerifiedAt: new Date().toISOString(),
}

const DashboardLayout = ({ children }: LayoutT) => {
  return (
    <div className={styles.shell}>
      <AppSidebar user={dashboardUser} />

      <div className={styles.workspace}>
        <MobileAppHeader user={dashboardUser} />

        <main className={styles.main}>
          <div className='mx-auto w-full max-w-360 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
