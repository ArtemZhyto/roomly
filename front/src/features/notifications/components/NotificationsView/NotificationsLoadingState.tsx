const NotificationsLoadingState = () => {
  return (
    <div
      className='min-h-72 animate-pulse rounded-card border border-border bg-surface-secondary shadow-card'
      role='status'
      aria-label='Loading notifications'
    >
      <span className='sr-only'>Loading notifications...</span>
    </div>
  )
}

export default NotificationsLoadingState
