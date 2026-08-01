// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

// Components
import BookingForm from '@features/booking/components/BookingForm/BookingForm'

// Fixtures
import { TEST_ROOM } from './booking-form.fixture'

describe('BookingForm validation', () => {
  it('shows required field errors', () => {
    render(
      <BookingForm
        room={TEST_ROOM}
        initialDate=''
        initialStartTime=''
        initialEndTime=''
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Book room',
      }),
    )

    expect(screen.getByText('Enter a title for the meeting.')).toBeInTheDocument()
    expect(screen.getByText('Select a meeting date.')).toBeInTheDocument()
    expect(screen.getByText('Select a start time.')).toBeInTheDocument()
    expect(screen.getByText('Select an end time.')).toBeInTheDocument()
  })

  it('marks invalid fields as invalid', () => {
    render(
      <BookingForm
        room={TEST_ROOM}
        initialDate=''
        initialStartTime=''
        initialEndTime=''
        onCancel={jest.fn()}
      />,
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Book room',
      }),
    )

    expect(screen.getByLabelText('Meeting title')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Date')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Start time')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('End time')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not submit invalid values', () => {
    const onSubmit = jest.fn()

    render(
      <BookingForm
        room={TEST_ROOM}
        initialDate=''
        initialStartTime=''
        initialEndTime=''
        onCancel={jest.fn()}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Book room',
      }),
    )

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
