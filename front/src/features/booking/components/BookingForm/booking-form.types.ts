// Types
import type { BookingFormValues } from '../../types'

export type UpdateBookingField = <Field extends keyof BookingFormValues>(
  field: Field,
  value: BookingFormValues[Field],
) => void
