const DashboardSkeleton = () => {
  return (
    <>
      <div
        className='grid animate-pulse gap-5 md:grid-cols-2'
        role='status'
        aria-label='Loading dashboard'
      >
        {Array.from({ length: 2 }, (_, index) => (
          <article
            key={index}
            className='flex min-h-72.5 min-w-0 flex-col rounded-card border border-border bg-surface p-5.5 shadow-card'
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='size-11 shrink-0 rounded-[13px] bg-primary-subtle' />

              <div className='h-7 w-22 rounded-full bg-surface-secondary' />
            </div>

            <div className='mt-5.5 flex flex-1 flex-col'>
              <div className='h-5 w-30 rounded-control bg-surface-secondary' />

              <div className='mt-2 flex items-end gap-2.5'>
                <div className='h-9.5 w-12 rounded-control bg-surface-secondary' />

                <div className='mb-0.5 h-4 w-22 rounded-control bg-surface-secondary' />
              </div>

              <div className='mt-4.5 flex max-w-85 flex-col gap-2'>
                <div className='h-4 w-full rounded-control bg-surface-secondary' />
                <div className='h-4 w-4/5 rounded-control bg-surface-secondary' />
              </div>
            </div>

            <div className='mt-5.5 h-10.5 w-full rounded-control bg-surface-secondary' />
          </article>
        ))}
      </div>

      <section className='animate-pulse'>
        <div className='mb-4.5 flex items-end justify-between gap-4'>
          <div>
            <div className='h-7 w-52 rounded-control bg-surface-secondary' />

            <div className='mt-2 h-4 w-60 max-w-full rounded-control bg-surface-secondary' />
          </div>

          <div className='h-4 w-18 rounded-control bg-surface-secondary' />
        </div>

        <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: 3 }, (_, index) => (
            <article
              key={index}
              className='flex min-h-80 min-w-0 flex-col rounded-card border border-border bg-surface p-5.5 shadow-card'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='size-11 shrink-0 rounded-[13px] bg-primary-subtle' />

                <div className='h-7 w-22 rounded-full bg-surface-secondary' />
              </div>

              <div className='mt-5.5 flex flex-1 flex-col'>
                <div className='h-6.5 w-3/4 rounded-control bg-surface-secondary' />

                <div className='mt-4.5 flex flex-col gap-2.5'>
                  <div className='flex min-h-5 items-center gap-2.5'>
                    <div className='size-4.5 shrink-0 rounded-[5px] bg-primary-subtle' />
                    <div className='h-4 w-38 rounded-control bg-surface-secondary' />
                  </div>

                  <div className='flex min-h-5 items-center gap-2.5'>
                    <div className='size-4.5 shrink-0 rounded-[5px] bg-primary-subtle' />
                    <div className='h-4 w-26 rounded-control bg-surface-secondary' />
                  </div>

                  <div className='flex min-h-5 items-center gap-2.5'>
                    <div className='size-4.5 shrink-0 rounded-[5px] bg-primary-subtle' />
                    <div className='h-4 w-24 rounded-control bg-surface-secondary' />
                  </div>

                  <div className='flex min-h-5 items-center gap-2.5'>
                    <div className='size-4.5 shrink-0 rounded-[5px] bg-primary-subtle' />
                    <div className='h-4 w-17 rounded-control bg-surface-secondary' />
                  </div>
                </div>
              </div>

              <div className='mt-5.5 h-10.5 w-full rounded-control bg-surface-secondary' />
            </article>
          ))}
        </div>
      </section>

      <span className='sr-only'>Loading dashboard...</span>
    </>
  )
}

export default DashboardSkeleton
