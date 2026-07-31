'use client'

// Modules
import Link from 'next/link'
import { ArrowRight, Building2, CalendarDays, Clock3, DoorOpen, MapPin } from 'lucide-react'

// Components
import PageHeader from '@components/layout/PageHeader'
import EmptyState from '@components-ui/EmptyState'

// Local components
import DashboardErrorState from './DashboardErrorState'
import DashboardSkeleton from './DashboardSkeleton'

// Hooks
import useDashboard from './useDashboard'

// Styles
import styles from './DashboardView.module.scss'

const USER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

const formatBookingDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: USER_TIME_ZONE,
  }).format(new Date(value))
}

const formatBookingTimeRange = (startTime: string, endTime: string): string => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: USER_TIME_ZONE,
  })

  return `${formatter.format(new Date(startTime))}–${formatter.format(new Date(endTime))}`
}

const getLocalDateValue = (value: string): string => {
  const date = new Date(value)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const DashboardView = () => {
  const { status, roomsCount, upcomingBookingsCount, upcomingBookings, retry } = useDashboard()

  const browseRoomsAction = (
    <Link href='/rooms' className={styles.primaryAction}>
      Browse rooms
      <ArrowRight size={17} strokeWidth={2} aria-hidden='true' />
    </Link>
  )

  return (
    <div className={styles.page}>
      <PageHeader
        title='Dashboard'
        description='A quick overview of your rooms, schedule and upcoming bookings.'
      />

      {status === 'loading' ? (
        <DashboardSkeleton />
      ) : status === 'error' ? (
        <DashboardErrorState
          onRetry={() => {
            void retry()
          }}
        />
      ) : (
        <>
          <div className={styles.statsGrid}>
            <article className={styles.card}>
              <div className={styles.header}>
                <div className={styles.cardIcon} aria-hidden='true'>
                  <Building2 size={22} strokeWidth={2} />
                </div>

                <div className={[styles.status, styles.statusRooms].join(' ')}>
                  <span className={styles.statusDot} aria-hidden='true' />
                  Rooms
                </div>
              </div>

              <div className={styles.content}>
                <p className={styles.eyebrow}>Meeting rooms</p>

                <div className={styles.valueRow}>
                  <strong className={styles.value}>{roomsCount}</strong>

                  <span className={styles.valueLabel}>in the office</span>
                </div>

                <p className={styles.description}>
                  Browse all rooms and open their weekly schedules.
                </p>
              </div>

              <Link href='/rooms' className={styles.action}>
                Browse rooms
                <ArrowRight
                  className={styles.actionIcon}
                  size={17}
                  strokeWidth={2}
                  aria-hidden='true'
                />
              </Link>
            </article>

            <article className={styles.card}>
              <div className={styles.header}>
                <div className={styles.cardIcon} aria-hidden='true'>
                  <CalendarDays size={22} strokeWidth={2} />
                </div>

                <div className={[styles.status, styles.statusUpcoming].join(' ')}>
                  <span className={styles.statusDot} aria-hidden='true' />
                  Upcoming
                </div>
              </div>

              <div className={styles.content}>
                <p className={styles.eyebrow}>Upcoming bookings</p>

                <div className={styles.valueRow}>
                  <strong className={styles.value}>{upcomingBookingsCount}</strong>

                  <span className={styles.valueLabel}>scheduled</span>
                </div>

                <p className={styles.description}>
                  Review your future reservations and manage them.
                </p>
              </div>

              <Link href='/my-bookings' className={styles.action}>
                View my bookings
                <ArrowRight
                  className={styles.actionIcon}
                  size={17}
                  strokeWidth={2}
                  aria-hidden='true'
                />
              </Link>
            </article>
          </div>

          {upcomingBookings.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title='No upcoming bookings'
              description='Your future room reservations will appear here.'
              action={browseRoomsAction}
            />
          ) : (
            <section className={styles.bookingsSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>Upcoming bookings</h2>

                  <p className={styles.sectionDescription}>Your nearest room reservations.</p>
                </div>

                <Link href='/my-bookings' className={styles.sectionLink}>
                  View all
                  <ArrowRight size={16} strokeWidth={2} aria-hidden='true' />
                </Link>
              </div>

              <div className={styles.bookingsGrid}>
                {upcomingBookings.map((booking) => (
                  <article key={booking.id} className={styles.bookingCard}>
                    <div className={styles.header}>
                      <div className={styles.cardIcon} aria-hidden='true'>
                        <DoorOpen size={22} strokeWidth={2} />
                      </div>

                      <div className={[styles.status, styles.statusUpcoming].join(' ')}>
                        <span className={styles.statusDot} aria-hidden='true' />
                        Upcoming
                      </div>
                    </div>

                    <div className={styles.content}>
                      <h3 className={styles.bookingTitle}>{booking.title}</h3>

                      <div className={styles.details}>
                        <div className={styles.detail}>
                          <CalendarDays size={17} strokeWidth={2} aria-hidden='true' />

                          <span>{formatBookingDate(booking.startTime)}</span>
                        </div>

                        <div className={styles.detail}>
                          <Clock3 size={17} strokeWidth={2} aria-hidden='true' />

                          <span>{formatBookingTimeRange(booking.startTime, booking.endTime)}</span>
                        </div>

                        <div className={styles.detail}>
                          <DoorOpen size={17} strokeWidth={2} aria-hidden='true' />

                          <span>{booking.room.name}</span>
                        </div>

                        <div className={styles.detail}>
                          <MapPin size={17} strokeWidth={2} aria-hidden='true' />

                          <span>Floor {booking.room.floor}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={
                        `/schedule?room=${booking.roomId}` +
                        `&date=${getLocalDateValue(booking.startTime)}`
                      }
                      className={styles.action}
                    >
                      View schedule
                      <ArrowRight
                        className={styles.actionIcon}
                        size={17}
                        strokeWidth={2}
                        aria-hidden='true'
                      />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default DashboardView
