const SettingsLoading = () => {
  return (
    <div className='flex animate-pulse flex-col gap-8' role='status' aria-label='Loading settings'>
      <div>
        <div className='h-10 w-44 rounded-control bg-border' />

        <div className='mt-3 h-4 w-100 max-w-full rounded-control bg-border' />
      </div>

      <section className='rounded-card border border-border bg-surface p-6'>
        <div>
          <div className='h-6 w-20 rounded-control bg-border' />

          <div className='mt-2 h-4 w-90 max-w-full rounded-control bg-border' />
        </div>

        <div className='mt-6 grid grid-cols-3 gap-3 max-[760px]:grid-cols-1'>
          {Array.from({
            length: 3,
          }).map((_, index) => {
            return (
              <div
                key={index}
                className='flex min-h-24 items-center gap-3 rounded-card border border-border p-4'
              >
                <div className='h-10 w-10 shrink-0 rounded-control bg-border' />

                <div className='flex min-w-0 flex-1 flex-col gap-2'>
                  <div className='h-4 w-20 rounded-control bg-border' />

                  <div className='h-3 w-full rounded-control bg-border' />
                </div>

                <div className='h-4.5 w-4.5 shrink-0 rounded-full bg-border' />
              </div>
            )
          })}
        </div>
      </section>

      <span className='sr-only'>Loading settings...</span>
    </div>
  )
}

export default SettingsLoading
