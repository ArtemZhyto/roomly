const ScheduleLoading = () => {
  return (
    <div className='flex animate-pulse flex-col gap-8' role='status' aria-label='Loading schedule'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex-1'>
          <div className='h-10 w-48 rounded-control bg-border' />
          <div className='mt-3 h-4 w-130 max-w-full rounded-control bg-border' />
        </div>

        <div className='h-10 w-52 rounded-control bg-border' />
      </div>

      <div className='flex min-h-72 flex-col items-center justify-center rounded-card border border-dashed border-border bg-surface px-6 py-12'>
        <div className='size-14 rounded-full bg-primary-subtle' />
        <div className='mt-5 h-6 w-72 max-w-full rounded-control bg-border' />
        <div className='mt-3 h-4 w-110 max-w-full rounded-control bg-border' />
        <div className='mt-6 h-11 w-36 rounded-control bg-border' />
      </div>

      <span className='sr-only'>Loading schedule...</span>
    </div>
  )
}

export default ScheduleLoading
