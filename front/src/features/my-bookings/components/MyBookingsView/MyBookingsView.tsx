'use client'

// Components
import BookingList from '../BookingList'
import BookingTabs from '../BookingTabs'
import CancelBookingDialog from '../CancelBookingDialog'
import MyBookingsEmptyState from './MyBookingsEmptyState'
import MyBookingsErrorState from './MyBookingsErrorState'
import MyBookingsLoadMore from './MyBookingsLoadMore'
import MyBookingsSkeleton from './MyBookingsSkeleton'

// Hooks
import useMyBookingsView from './useMyBookingsView'

// Styles
import styles from './MyBookingsView.module.scss'

const MyBookingsView = () => {
  const {
    activePeriod,
    bookings,
    upcomingCount,
    pastCount,
    selectedBooking,
    status,
    errorMessage,
    isCancellationDialogOpen,
    isCancelling,
    hasMoreBookings,
    isLoadingMore,
    setActivePeriod,
    openBooking,
    requestCancellation,
    closeCancellationDialog,
    finishCancellationDialogClose,
    confirmCancellation,
    loadMoreBookings,
    retry,
  } = useMyBookingsView()

  return (
    <>
      <section className={styles.section}>
        <div className={styles.toolbar}>
          <div>
            <h1 className={styles.title}>My bookings</h1>

            <p className={styles.description}>View and manage your meeting room reservations.</p>
          </div>

          <BookingTabs
            activePeriod={activePeriod}
            upcomingCount={upcomingCount}
            pastCount={pastCount}
            onChange={setActivePeriod}
          />
        </div>

        <div className={styles.content} role='tabpanel'>
          {status === 'loading' && <MyBookingsSkeleton />}

          {status === 'error' && (
            <MyBookingsErrorState
              onRetry={() => {
                void retry()
              }}
            />
          )}

          {status === 'idle' && errorMessage && <p role='alert'>{errorMessage}</p>}

          {status === 'idle' && bookings.length === 0 && (
            <MyBookingsEmptyState period={activePeriod} />
          )}

          {status === 'idle' && bookings.length > 0 && (
            <BookingList
              bookings={bookings}
              onOpenBooking={openBooking}
              onCancelBooking={activePeriod === 'upcoming' ? requestCancellation : undefined}
            />
          )}

          {status === 'idle' && bookings.length > 0 && hasMoreBookings && (
            <MyBookingsLoadMore
              isLoading={isLoadingMore}
              onLoadMore={() => {
                void loadMoreBookings()
              }}
            />
          )}
        </div>
      </section>

      {selectedBooking && (
        <CancelBookingDialog
          booking={selectedBooking}
          isOpen={isCancellationDialogOpen}
          isLoading={isCancelling}
          onClose={closeCancellationDialog}
          onExited={finishCancellationDialogClose}
          onConfirm={confirmCancellation}
        />
      )}
    </>
  )
}

export default MyBookingsView
