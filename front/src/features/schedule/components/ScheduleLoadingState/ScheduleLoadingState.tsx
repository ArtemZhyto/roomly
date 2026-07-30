const ScheduleLoadingState = () => {
  return (
    <div
      className='overflow-hidden rounded-card border border-border bg-surface'
      role='status'
      aria-label='Loading room schedule'
      aria-live='polite'
    >
      <span className='sr-only'>Loading room schedule...</span>

      <div className='grid min-w-240 grid-cols-[72px_repeat(7,minmax(132px,1fr))]'>
        <div className='h-16 border-b border-r border-border bg-surface-secondary' />

        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className='flex h-16 flex-col items-center justify-center gap-2 border-b border-r border-border px-3 last:border-r-0'
          >
            <div className='h-3 w-14 animate-pulse rounded-full bg-border' />
            <div className='h-4 w-8 animate-pulse rounded-full bg-border' />
          </div>
        ))}

        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div key={rowIndex} className='contents'>
            <div className='flex h-20 items-start justify-center border-b border-r border-border px-2 py-3'>
              <div className='h-3 w-10 animate-pulse rounded-full bg-border' />
            </div>

            {Array.from({ length: 7 }).map((_, columnIndex) => (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className='h-20 border-b border-r border-border p-2 last:border-r-0'
              >
                {(rowIndex + columnIndex) % 6 === 0 && (
                  <div className='h-full animate-pulse rounded-control bg-primary-subtle' />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScheduleLoadingState
