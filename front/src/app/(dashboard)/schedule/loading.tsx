const ScheduleLoading = () => {
  return (
    <div className='flex animate-pulse flex-col gap-8' role='status' aria-label='Loading schedule'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex-1'>
          <div className='h-10 w-48 rounded-control bg-surface-secondary' />
          <div className='mt-3 h-4 w-130 max-w-full rounded-control bg-surface-secondary' />
        </div>

        <div className='h-10 w-60 rounded-control bg-surface-secondary' />
      </div>

      <div className='rounded-card border border-border bg-surface p-5 shadow-card'>
        <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex items-center gap-4'>
            <div className='size-12 rounded-[14px] bg-surface-secondary' />

            <div>
              <div className='h-6 w-32 rounded-control bg-surface-secondary' />
              <div className='mt-2 h-4 w-52 rounded-control bg-surface-secondary' />
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <div className='size-10 rounded-control bg-surface-secondary' />
            <div className='h-10 w-48 rounded-control bg-surface-secondary' />
            <div className='size-10 rounded-control bg-surface-secondary' />
            <div className='h-10 w-18 rounded-control bg-surface-secondary' />
          </div>
        </div>
      </div>

      <div className='overflow-hidden rounded-card border border-border bg-surface shadow-card'>
        <div className='h-11 border-b border-border bg-surface-secondary' />

        <div className='overflow-hidden'>
          <div className='grid min-w-280 grid-cols-[78px_repeat(7,minmax(150px,1fr))]'>
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className='h-18 border-r border-b border-border bg-surface-secondary'
              />
            ))}

            {Array.from({ length: 8 }, (_, columnIndex) => (
              <div key={columnIndex} className='border-r border-border'>
                {Array.from({ length: 20 }, (_, rowIndex) => (
                  <div key={rowIndex} className='h-9.5 border-t border-border' />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className='sr-only'>Loading schedule...</span>
    </div>
  )
}

export default ScheduleLoading
