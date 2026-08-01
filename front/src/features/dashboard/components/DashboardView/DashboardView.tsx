'use client'

// Components
import PageHeader from '@components/layout/PageHeader'

// Local components
import DashboardBookingsSection from './components/DashboardBookingsSection'
import DashboardStats from './components/DashboardStats'
import DashboardErrorState from './DashboardErrorState'
import DashboardSkeleton from './DashboardSkeleton'

// Hooks
import useDashboard from './useDashboard'

// Styles
import styles from './DashboardView.module.scss'

const DashboardView = () => {
  const { status, roomsCount, upcomingBookingsCount, upcomingBookings, retry } = useDashboard()

  const handleRetry = (): void => {
    void retry()
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title='Dashboard'
        description='A quick overview of your rooms, schedule and upcoming bookings.'
      />

      {status === 'loading' && <DashboardSkeleton />}

      {status === 'error' && <DashboardErrorState onRetry={handleRetry} />}

      {status === 'idle' && (
        <>
          <DashboardStats roomsCount={roomsCount} upcomingBookingsCount={upcomingBookingsCount} />

          <DashboardBookingsSection bookings={upcomingBookings} />
        </>
      )}
    </div>
  )
}

export default DashboardView
