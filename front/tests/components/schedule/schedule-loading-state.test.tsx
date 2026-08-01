// Modules
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import ScheduleLoadingState from '@features/schedule/components/ScheduleLoadingState/ScheduleLoadingState'

describe('ScheduleLoadingState', () => {
  it('renders an accessible loading status', () => {
    render(<ScheduleLoadingState />)

    expect(
      screen.getByRole('status', {
        name: 'Loading room schedule',
      }),
    ).toBeInTheDocument()
  })

  it('renders a screen-reader loading message', () => {
    render(<ScheduleLoadingState />)

    expect(screen.getByText('Loading room schedule...')).toBeInTheDocument()
  })
})
