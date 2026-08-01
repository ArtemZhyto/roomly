// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

// Components
import BookingForm from '@features/booking/components/BookingForm/BookingForm'

// Fixtures
import { TEST_ROOM } from './booking-form.fixture'

const getRecurrenceCheckbox = () => {
  return screen.getByRole('checkbox', {
    name: /Repeat weekly/i,
  })
}

const getRecurrenceCountInput = () => {
  return screen.getByRole('spinbutton')
}

describe('BookingForm recurrence', () => {
  it('does not show the occurrence count initially', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
  })

  it('shows the occurrence count when recurrence is enabled', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    fireEvent.click(getRecurrenceCheckbox())

    expect(getRecurrenceCountInput()).toBeInTheDocument()

    expect(screen.getByText(/Between\s+2\s+and\s+52\s+weekly occurrences\./i)).toBeInTheDocument()
  })

  it('updates the recurrence count', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    fireEvent.click(getRecurrenceCheckbox())

    const countInput = getRecurrenceCountInput()

    fireEvent.change(countInput, {
      target: {
        value: '8',
      },
    })

    expect(countInput).toHaveValue(8)
  })

  it('normalizes the recurrence count on blur', () => {
    render(<BookingForm room={TEST_ROOM} onCancel={jest.fn()} />)

    fireEvent.click(getRecurrenceCheckbox())

    const countInput = getRecurrenceCountInput()

    fireEvent.change(countInput, {
      target: {
        value: '100',
      },
    })

    fireEvent.blur(countInput)

    expect(countInput).toHaveValue(52)
  })
})
