const RoomsLoading = () => {
  return (
    <div className='flex animate-pulse flex-col gap-8' role='status' aria-label='Loading rooms'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex-1'>
          <div className='h-10 w-64 rounded-control bg-border' />
          <div className='mt-3 h-4 w-120 max-w-full rounded-control bg-border' />
        </div>

        <div className='h-10 w-52 rounded-control bg-border' />
      </div>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className='rounded-card border border-border bg-surface p-5'>
            <div className='h-6 w-36 rounded-control bg-border' />
            <div className='mt-4 h-4 w-24 rounded-control bg-border' />
            <div className='mt-2 h-4 w-32 rounded-control bg-border' />
            <div className='mt-6 h-10 w-full rounded-control bg-primary-subtle' />
          </div>
        ))}
      </div>

      <span className='sr-only'>Loading rooms...</span>
    </div>
  )
}

export default RoomsLoading
