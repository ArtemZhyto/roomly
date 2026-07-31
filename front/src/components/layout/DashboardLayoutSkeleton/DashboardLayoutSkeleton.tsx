const DashboardLayoutSkeleton = () => {
  return (
    <div
      className='flex min-h-dvh animate-pulse bg-background'
      role='status'
      aria-label='Loading account'
    >
      <aside className='hidden w-72 shrink-0 border-r border-border bg-surface lg:block' />

      <div className='flex min-w-0 flex-1 flex-col'>
        <div className='h-16 border-b border-border bg-surface lg:hidden' />

        <main className='flex-1'>
          <div className='mx-auto w-full max-w-360 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10'>
            <div className='h-44 rounded-card border border-border bg-surface-secondary' />
          </div>
        </main>
      </div>

      <span className='sr-only'>Loading account...</span>
    </div>
  )
}

export default DashboardLayoutSkeleton
