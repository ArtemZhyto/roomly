'use client'

// Features
import type { Room } from '@features/rooms'

// Types
import type { BookingFormStatus, BookingFormValues } from '../../types'

// Components
import BookingFormActions from './BookingFormActions'
import BookingFormFields from './BookingFormFields'
import BookingFormMessages from './BookingFormMessages'

// Hooks
import useBookingForm from './useBookingForm'

// Styles
import styles from './BookingForm.module.scss'

interface BookingFormProps {
  initialRoom?: Room
  initialDate?: string
  initialStartTime?: string
  status?: BookingFormStatus
  closeModal?: () => void
  onCancel: () => void
  onSubmit?: (values: BookingFormValues) => void
}

const BookingForm = ({
  initialRoom,
  initialDate,
  initialStartTime,
  status = 'idle',
  closeModal,
  onCancel,
  onSubmit,
}: BookingFormProps) => {
  const { values, errors, durationLabel, updateField, handleSubmit } = useBookingForm({
    initialRoom,
    initialDate,
    initialStartTime,
    onSubmit,
  })

  const isLoading = status === 'loading'

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <BookingFormMessages status={status} />

      <BookingFormFields
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
