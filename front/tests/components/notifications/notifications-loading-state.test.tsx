// Modules
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import NotificationsLoadingState from '@features/notifications/components/NotificationsView/NotificationsLoadingState'

describe('NotificationsLoadingState', () => {
  it('renders an accessible loading status', () => {
    render(<NotificationsLoadingState />)

    expect(
      screen.getByRole('status', {
        name: 'Loading notifications',
      }),
    ).toBeInTheDocument()
  })

  it('renders a screen-reader loading message', () => {
    render(<NotificationsLoadingState />)

    expect(screen.getByText('Loading notifications...')).toBeInTheDocument()
  })
})
