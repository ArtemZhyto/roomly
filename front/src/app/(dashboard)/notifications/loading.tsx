const NotificationsLoading = () => {
  return (
    <div
      className='flex animate-pulse flex-col gap-8'
      role='status'
      aria-label='Loading notifications'
    >
      <div>
        <div className='h-10 w-60 rounded-control bg-border' />
        <div className='mt-3 h-4 w-120 max-w-full rounded-control bg-border' />
      </div>

      <div className='flex min-h-72 flex-col items-center justify-center rounded-card border border-dashed border-border bg-surface px-6 py-12'>
        <div className='size-14 rounded-full bg-primary-subtle' />
        <div className='mt-5 h-6 w-52 rounded-control bg-border' />
        <div className='mt-3 h-4 w-100 max-w-full rounded-control bg-border' />
        <div className='mt-2 h-4 w-72 max-w-[80%] rounded-control bg-border' />
      </div>

      <span className='sr-only'>Loading notifications...</span>
    </div>
  )
}

export default NotificationsLoading
