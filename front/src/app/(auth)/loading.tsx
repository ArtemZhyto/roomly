const AuthLoading = () => {
  return (
    <div className='w-full max-w-110 animate-pulse font-afacad' aria-live='polite' aria-busy='true'>
      <span className='sr-only'>Loading authentication page...</span>

      <div className='mb-7'>
        <div className='mb-3 h-4 w-28 rounded-full bg-border-primary' />

        <div className='h-10 w-4/5 rounded-[10px] bg-border-primary' />

        <div className='mt-4 h-5 w-full rounded-full bg-border-primary' />
        <div className='mt-2 h-5 w-3/4 rounded-full bg-border-primary' />
      </div>

      <div className='flex flex-col gap-4.5'>
        <div>
          <div className='mb-2 h-4 w-24 rounded-full bg-border-primary' />
          <div className='h-13 w-full rounded-input bg-border-primary' />
        </div>

        <div>
          <div className='mb-2 h-4 w-20 rounded-full bg-border-primary' />
          <div className='h-13 w-full rounded-input bg-border-primary' />
        </div>

        <div className='mt-1 h-13 w-full rounded-[10px] bg-primary-subtle' />
      </div>
    </div>
  )
}

export default AuthLoading
