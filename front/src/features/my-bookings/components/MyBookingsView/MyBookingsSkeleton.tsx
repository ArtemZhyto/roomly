const MyBookingsSkeleton = () => {
  return (
    <div className='flex animate-pulse flex-col gap-4' role='status' aria-label='Loading bookings'>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className='min-h-36 rounded-card border border-border bg-surface-secondary shadow-card'
        />
      ))}

      <span className='sr-only'>Loading bookings...</span>
    </div>
  )
}

export default MyBookingsSkeleton