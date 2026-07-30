// Types
import type { BookingFormErrors, BookingFormValues, UpdateBookingField } from './booking-form.types'

// Constants
import { MAX_RECURRENCE_COUNT, MIN_RECURRENCE_COUNT } from './booking-form.constants'

interface BookingRecurrenceFieldProps {
  values: BookingFormValues
  errors: BookingFormErrors
  isLoading: boolean
  updateField: UpdateBookingField
}

const BookingRecurrenceField = ({
  values,
  errors,
  isLoading,
  updateField,
}: BookingRecurrenceFieldProps) => {
  return (
    <fieldset
      className='m-0 flex flex-col gap-3 rounded-control border border-border p-4'
      disabled={isLoading}
    >
      <label className='flex cursor-pointer items-center justify-between gap-4'>
        <span className='flex flex-col gap-1'>
          <span className='text-sm font-semibold text-text-primary'>Repeat weekly</span>

          <span className='text-sm leading-5 text-text-secondary'>
            Create the same booking once per week.
          </span>
        </span>

        <input
          type='checkbox'
          checked={values.repeatWeekly}
          onChange={(event) => {
            updateField('repeatWeekly', event.target.checked)
          }}
          className='size-5 accent-primary'
        />
      </label>

      {values.repeatWeekly && (
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-semibold text-text-primary'>Number of occurrences</span>

          <input
            type='number'
            value={values.recurrenceCount}
            min={MIN_RECURRENCE_COUNT}
            max={MAX_RECURRENCE_COUNT}
            step={1}
            inputMode='numeric'
            disabled={isLoading}
            aria-invalid={Boolean(errors.recurrenceCount)}
            aria-describedby={
              errors.recurrenceCount ? 'recurrence-count-error' : 'recurrence-count-hint'
            }
            onChange={(event) => {
              const nextValue = Number(event.target.value)

              if (Number.isNaN(nextValue)) {
                return
              }

              const clampedValue = Math.min(
                MAX_RECURRENCE_COUNT,
                Math.max(MIN_RECURRENCE_COUNT, nextValue),
              )

              updateField('recurrenceCount', clampedValue)
            }}
            className='min-h-11 w-full rounded-control border border-border bg-surface px-3 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary-subtle disabled:cursor-not-allowed disabled:opacity-60'
          />

          {errors.recurrenceCount ? (
            <span id='recurrence-count-error' className='text-sm text-danger' role='alert'>
              {errors.recurrenceCount}
            </span>
          ) : (
            <span id='recurrence-count-hint' className='text-sm text-text-secondary'>
              Between {MIN_RECURRENCE_COUNT} and {MAX_RECURRENCE_COUNT} weekly occurrences.
            </span>
          )}
        </label>
      )}
    </fieldset>
  )
}

export default BookingRecurrenceField
