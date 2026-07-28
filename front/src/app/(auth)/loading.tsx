const AuthLoading = () => {
  return (
    <div className='grid min-h-dvh grid-cols-[minmax(460px,44%)_minmax(0,1fr)] bg-background max-[1000px]:grid-cols-[minmax(360px,40%)_minmax(0,1fr)] max-[900px]:grid-cols-1'>
      <div className='bg-[#212732] max-[900px]:hidden' />

      <section className='grid min-h-dvh place-items-center px-8 py-6 max-[900px]:px-5'>
        <div
          className='flex flex-col items-center gap-4 font-afacad'
          role='status'
          aria-live='polite'
        >
          <span
            className='block size-7 animate-spin rounded-full border-[3px] border-black/20 border-t-black'
            aria-hidden='true'
          />

          <span className='text-sm font-medium text-text-secondary'>Loading...</span>
        </div>
      </section>
    </div>
  )
}

export default AuthLoading
