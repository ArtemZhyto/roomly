// Modules
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Components
import RoomsLoadingState from '@features/rooms/components/RoomsLoadingState/RoomsLoadingState'

describe('RoomsLoadingState', () => {
  it('announces that meeting rooms are loading', () => {
    render(<RoomsLoadingState />)

    expect(
      screen.getByRole('region', {
        name: 'Loading meeting rooms',
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('Loading meeting rooms...')).toBeInTheDocument()
  })

  it('marks the loading region as busy', () => {
    render(<RoomsLoadingState />)

    expect(
      screen.getByRole('region', {
        name: 'Loading meeting rooms',
      }),
    ).toHaveAttribute('aria-busy', 'true')
  })
})
