const DashboardSkeleton = () => {
  return (
    <div className='flex flex-col gap-8' aria-label='Loading dashboard' aria-busy='true'>
      <header className='flex flex-col gap-3'>
        <div className='h-9 w-48 animate-pulse rounded-control bg-surface-secondary' />

        <div className='h-5 w-96 max-w-full animate-pulse rounded-control bg-surface-secondary' />
      </header>

      <div className='grid gap-4 sm:grid-cols-2'>
        {Array.from({ length: 2 }, (_, index) => (
          <section
            key={index}
            className='flex min-h-24 items-center gap-3 rounded-card border border-border bg-surface p-5 shadow-card'
          >
            <div className='size-10 shrink-0 animate-pulse rounded-control bg-surface-secondary' />

            <div className='flex flex-col gap-2'>
              <div className='h-4 w-32 animate-pulse rounded-control bg-surface-secondary' />

              <div className='h-7 w-16 animate-pulse rounded-control bg-surface-secondary' />
            </div>
          </section>
        ))}
      </div>

      <section className='rounded-card border border-border bg-surface p-5 shadow-card'>
        <div className='mb-5 flex items-center justify-between gap-4'>
          <div className='h-7 w-48 animate-pulse rounded-control bg-surface-secondary' />

          <div className='h-5 w-28 animate-pulse rounded-control bg-surface-secondary' />
        </div>

        <div className='flex flex-col gap-3'>
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className='flex min-h-20 items-center gap-4 rounded-control border border-border p-4'
            >
              <div className='size-10 shrink-0 animate-pulse rounded-control bg-surface-secondary' />

              <div className='flex flex-1 flex-col gap-2'>
                <div className='h-5 w-44 max-w-[65%] animate-pulse rounded-control bg-surface-secondary' />

                <div className='h-4 w-72 max-w-[85%] animate-pulse rounded-control bg-surface-secondary' />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardSkeleton
