const ROOM_SKELETON_COUNT = 6

const RoomsLoadingState = () => {
  return (
    <section aria-label='Loading meeting rooms' aria-live='polite' aria-busy='true'>
      <span className='sr-only'>Loading meeting rooms...</span>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({
          length: ROOM_SKELETON_COUNT,
        }).map((_, index) => {
          return (
            <article
              key={index}
              className='flex min-h-52 animate-pulse flex-col justify-between rounded-card border border-border bg-surface p-5'
            >
              <div className='flex flex-col gap-4'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='h-6 w-32 rounded-full bg-border' />

                  <div className='h-9 w-9 rounded-control bg-border' />
                </div>

                <div className='h-4 w-24 rounded-full bg-border' />

                <div className='h-4 w-36 rounded-full bg-border' />
              </div>

              <div className='mt-8 flex items-center justify-between gap-4'>
                <div className='h-7 w-24 rounded-full bg-border' />

                <div className='h-10 w-28 rounded-control bg-border' />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default RoomsLoadingState
