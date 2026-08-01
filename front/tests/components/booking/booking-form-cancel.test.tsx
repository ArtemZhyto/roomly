// Modules
import { describe, expect, it, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'

// Components
import BookingForm from '@features/booking/components/BookingForm/BookingForm'

// Fixtures
import { TEST_ROOM } from './booking-form.fixture'

describe('BookingForm cancellation', () => {
  it('calls onCancel by default', () => {
    const onCancel = jest.fn()

    render(<BookingForm room={TEST_ROOM} onCancel={onCancel} />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Cancel',
      }),
    )

    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('prefers closeModal when provided', () => {
    const onCancel = jest.fn()
    const closeModal = jest.fn()

    render(<BookingForm room={TEST_ROOM} onCancel={onCancel} closeModal={closeModal} />)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Cancel',
      }),
    )

    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(onCancel).not.toHaveBeenCalled()
  })
})
