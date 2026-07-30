// Modules
import { CalendarPlus } from 'lucide-react'

interface BookingSuccessStateProps {
  onClose: () => void
  closeModal?: () => void
}

const BookingSuccessState = ({ onClose, closeModal }: BookingSuccessStateProps) => {
  const handleClose = closeModal ?? onClose

  return (
    <div className='flex flex-col items-center py-6 text-center'>
      <div className='grid size-14 place-items-center rounded-full bg-success-light text-success-dark'>
        <CalendarPlus className='size-6' strokeWidth={2} aria-hidden='true' />
      </div>

      <h3 className='mt-5 text-xl font-semibold text-text-primary'>Booking created</h3>

      <p className='mt-2 max-w-90 text-sm leading-6 text-text-secondary'>
        Your meeting has been added successfully. The schedule will be updated after backend
        integration.
      </p>

      <button
        type='button'
        className='mt-6 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-control border border-primary bg-primary px-5 text-sm font-semibold text-text-inverse transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-subtle'
        onClick={handleClose}
      >
        Done
      </button>
    </div>
  )
}

export default BookingSuccessState
