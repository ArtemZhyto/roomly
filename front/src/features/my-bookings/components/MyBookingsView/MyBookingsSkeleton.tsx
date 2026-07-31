const SKELETON_ITEMS = 3

const MyBookingsSkeleton = () => {
  return (
    <div className='flex flex-col gap-3' aria-label='Loading bookings' aria-busy='true'>
      {Array.from({ length: SKELETON_ITEMS }, (_, index) => (
        <article
          key={index}
          className='flex min-h-28 items-center gap-4 rounded-card border border-border bg-surface p-4.5 shadow-card'
        >
          <div className='size-11 shrink-0 animate-pulse rounded-[13px] bg-surface-secondary' />

          <div className='flex min-w-0 flex-1 flex-col gap-3'>
            <div className='flex items-center justify-between gap-4'>
              <div className='h-6 w-48 max-w-[60%] animate-pulse rounded-control bg-surface-secondary' />

              <div className='h-7 w-24 shrink-0 animate-pulse rounded-full bg-surface-secondary' />
            </div>

            <div className='flex flex-wrap gap-2.5'>
              <div className='h-5 w-32 animate-pulse rounded-control bg-surface-secondary' />

              <div className='h-5 w-24 animate-pulse rounded-control bg-surface-secondary' />

              <div className='h-5 w-28 animate-pulse rounded-control bg-surface-secondary' />

              <div className='h-5 w-20 animate-pulse rounded-control bg-surface-secondary' />
            </div>
          </div>

          <div className='h-10 w-24 shrink-0 animate-pulse rounded-control bg-surface-secondary' />
        </article>
      ))}
    </div>
  )
}

export default MyBookingsSkeleton
