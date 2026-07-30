'use client'

// Features
import type { Room } from '@features/rooms'

// Types
import type { BookingFormStatus, BookingFormValues } from './booking-form.types'

// Constants
import { DEFAULT_END_TIME, DEFAULT_START_TIME } from './booking-form.constants'

// Components
import BookingFormActions from './BookingFormActions'
import BookingFormFields from './BookingFormFields'
import BookingFormMessages from './BookingFormMessages'

// Hooks
import useBookingForm from './useBookingForm'

// Styles
import styles from './BookingForm.module.scss'

interface BookingFormProps {
  room: Room
  initialDate?: string
  initialStartTime?: string
  initialEndTime?: string
  status?: BookingFormStatus
  serverError?: string
  closeModal?: () => void
  onCancel: () => void
  onSubmit?: (values: BookingFormValues) => void
}

const BookingForm = ({
  room,
  initialDate = '',
  initialStartTime = DEFAULT_START_TIME,
  initialEndTime = DEFAULT_END_TIME,
  status = 'idle',
  serverError,
  closeModal,
  onCancel,
  onSubmit,
}: BookingFormProps) => {
  const { values, errors, durationLabel, updateField, handleSubmit } = useBookingForm({
    room,
    initialDate,
    initialStartTime,
    initialEndTime,
    onSubmit,
  })

  const isLoading = status === 'loading'

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <BookingFormMessages status={status} serverError={serverError} />

      <BookingFormFields
        room={room}
        values={values}
        errors={errors}
        durationLabel={durationLabel}
        isLoading={isLoading}
        updateField={updateField}
      />

      <BookingFormActions isLoading={isLoading} onCancel={closeModal ?? onCancel} />
    </form>
  )
}

export default BookingForm
