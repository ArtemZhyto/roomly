'use client'

// Modules
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Components
import AppSidebar from '@components/layout/AppSidebar'
import DashboardLayoutSkeleton from '@components/layout/DashboardLayoutSkeleton/DashboardLayoutSkeleton'
import DashboardServerError from '@components/layout/DashboardServerError'
import MobileAppHeader from '@components/layout/MobileAppHeader'

// Hooks
import { useAuth } from '@providers/AuthProvider'

// Types
import type { LayoutT } from '@shared-types/layout'

// Styles
import styles from './dashboard-layout.module.scss'

const DashboardLayout = ({ children }: LayoutT) => {
  const router = useRouter()
  const { user, status, refreshUser } = useAuth()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [router, status])

  if (status === 'loading') {
    return <DashboardLayoutSkeleton />
  }

  if (status === 'error') {
    return (
      <DashboardServerError
        onRetry={() => {
          void refreshUser()
        }}
      />
    )
  }

  if (status === 'unauthenticated' || !user) {
    return <DashboardLayoutSkeleton />
  }

  return (
    <div className={styles.shell}>
      <AppSidebar user={user} />

      <div className={styles.workspace}>
        <MobileAppHeader user={user} />

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
