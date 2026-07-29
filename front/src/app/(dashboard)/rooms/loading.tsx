const RoomsLoadingPage = () => {
  return (
    <div className='flex flex-col gap-8' aria-label='Loading meeting rooms' aria-busy='true'>
      <header className='flex flex-col justify-between gap-5 lg:flex-row lg:items-start'>
        <div className='flex flex-col gap-3'>
          <div className='h-9 w-48 animate-pulse rounded-control bg-surface-secondary' />
          <div className='h-5 w-96 max-w-full animate-pulse rounded-control bg-surface-secondary' />
        </div>

        <div className='h-10 w-56 animate-pulse rounded-control bg-surface-secondary' />
      </header>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }, (_, index) => (
          <article
            key={index}
            className='flex min-h-72 flex-col rounded-card border border-border bg-surface p-5.5 shadow-card'
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='size-11 animate-pulse rounded-[13px] bg-surface-secondary' />
              <div className='h-7 w-28 animate-pulse rounded-full bg-surface-secondary' />
            </div>

            <div className='mt-5.5 h-7 w-36 animate-pulse rounded-control bg-surface-secondary' />

            <div className='mt-4.5 flex flex-col gap-2.5'>
              <div className='h-5 w-24 animate-pulse rounded-control bg-surface-secondary' />
              <div className='h-5 w-36 animate-pulse rounded-control bg-surface-secondary' />
            </div>

            <div className='mt-auto h-10.5 animate-pulse rounded-control bg-surface-secondary' />
          </article>
        ))}
      </div>
    </div>
  )
}

export default RoomsLoadingPage
