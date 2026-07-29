const SettingsLoading = () => {
  return (
    <div className='flex animate-pulse flex-col gap-8' role='status' aria-label='Loading settings'>
      <div>
        <div className='h-10 w-44 rounded-control bg-border' />
        <div className='mt-3 h-4 w-100 max-w-full rounded-control bg-border' />
      </div>

      <div className='grid gap-6 xl:grid-cols-2'>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className='rounded-card border border-border bg-surface p-6'>
            <div className='h-6 w-28 rounded-control bg-border' />

            <div className='mt-6 flex flex-col gap-4'>
              <div className='h-4 w-20 rounded-control bg-border' />
              <div className='h-11 w-full rounded-control bg-border' />

              <div className='h-4 w-24 rounded-control bg-border' />
              <div className='h-11 w-full rounded-control bg-border' />
            </div>
          </div>
        ))}
      </div>

      <span className='sr-only'>Loading settings...</span>
    </div>
  )
}

export default SettingsLoading
