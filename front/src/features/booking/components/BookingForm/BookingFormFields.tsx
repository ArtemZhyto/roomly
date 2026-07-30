// Types
import { RoomResponse } from '@features/rooms'
import type { BookingFormErrors, BookingFormValues, UpdateBookingField } from './booking-form.types'

// Components
import BookingDateField from './BookingDateField'
import BookingDurationSummary from './BookingDurationSummary'
import BookingRoomField from './BookingRoomField'
import BookingTimeFields from './BookingTimeFields'
import BookingTitleField from './BookingTitleField'

interface BookingFormFieldsProps {
  rooms: RoomResponse[]
  values: BookingFormValues
  errors: BookingFormErrors
  durationLabel: string
  isLoading: boolean
  updateField: UpdateBookingField
}

const BookingFormFields = ({
  rooms,
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

      <BookingRoomField
        rooms={rooms}
        value={values.roomId}
        error={errors.roomId}
        isLoading={isLoading}
        updateField={updateField}
      />

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
