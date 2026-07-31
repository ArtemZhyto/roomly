export interface BookingFormValues {
  title: string
  roomId: number
  date: string
  startTime: string
  endTime: string
  repeatWeekly: boolean
  recurrenceCount: string
}

export interface BookingFormErrors {
  title?: string
  roomId?: string
  date?: string
  startTime?: string
  endTime?: string
  recurrenceCount?: string
  form?: string
}

export type BookingFormStatus = 'idle' | 'loading' | 'success' | 'conflict' | 'error'

export type UpdateBookingField = <Field extends keyof BookingFormValues>(
  field: Field,
  value: BookingFormValues[Field],
) => void
