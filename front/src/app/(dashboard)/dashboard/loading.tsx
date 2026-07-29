const DashboardLoading = () => {
  return (
    <div className='flex animate-pulse flex-col gap-8' role='status' aria-label='Loading dashboard'>
      <div>
        <div className='h-10 w-56 max-w-full rounded-control bg-border' />
        <div className='mt-3 h-4 w-120 max-w-full rounded-control bg-border' />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className='flex min-h-24 items-center gap-3 rounded-card border border-border bg-surface p-5'
          >
            <div className='size-10 shrink-0 rounded-control bg-primary-subtle' />

            <div className='flex-1'>
              <div className='h-3.5 w-28 rounded-control bg-border' />
              <div className='mt-3 h-7 w-12 rounded-control bg-border' />
            </div>
          </div>
        ))}
      </div>

      <div className='flex min-h-72 flex-col items-center justify-center rounded-card border border-dashed border-border bg-surface px-6 py-12'>
        <div className='size-14 rounded-full bg-primary-subtle' />
        <div className='mt-5 h-6 w-64 max-w-full rounded-control bg-border' />
        <div className='mt-3 h-4 w-100 max-w-full rounded-control bg-border' />
        <div className='mt-6 h-11 w-36 rounded-control bg-border' />
      </div>

      <span className='sr-only'>Loading dashboard...</span>
    </div>
  )
}

export default DashboardLoading
