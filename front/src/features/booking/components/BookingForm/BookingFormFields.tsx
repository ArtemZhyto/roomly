// Types
import type { BookingFormErrors, BookingFormValues, UpdateBookingField } from './booking-form.types'
import type { Room } from '@features/rooms'

// Components
import BookingDateField from './BookingDateField'
import BookingDurationSummary from './BookingDurationSummary'
import BookingRoomField from './BookingRoomField'
import BookingTimeFields from './BookingTimeFields'
import BookingTitleField from './BookingTitleField'

interface BookingFormFieldsProps {
  room: Room
  values: BookingFormValues
  errors: BookingFormErrors
  durationLabel: string
  isLoading: boolean
  updateField: UpdateBookingField
}

const BookingFormFields = ({
  room,
  values,
  errors,
  durationLabel,
  isLoading,
  updateField,
}: BookingFormFieldsProps) => {
  return (
    <>
      <BookingTitleField
        value={values.title}
        error={errors.title}
        isLoading={isLoading}
        updateField={updateField}
      />

      <BookingRoomField room={room} />

      <BookingDateField
        value={values.date}
        error={errors.date}
        isLoading={isLoading}
        updateField={updateField}
      />

      <BookingTimeFields
        startTime={values.startTime}
        endTime={values.endTime}
        startTimeError={errors.startTime}
        endTimeError={errors.endTime}
        isLoading={isLoading}
        updateField={updateField}
      />

      <BookingDurationSummary durationLabel={durationLabel} />
    </>
  )
}

export default BookingFormFields
