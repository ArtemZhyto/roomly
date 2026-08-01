// Modules
import axios from 'axios'
import { describe, expect, it } from '@jest/globals'

// Utils
import { getNotificationErrorMessage } from '@features/notifications/utils/getNotificationErrorMessage'

describe('getNotificationErrorMessage', () => {
  it('returns the backend Axios error message', () => {
    const error = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      {
        headers: new axios.AxiosHeaders(),
      },
      undefined,
      {
        data: {
          message: 'The notification could not be updated.',
        },
        status: 400,
        statusText: 'Bad Request',
        headers: new axios.AxiosHeaders(),
        config: {
          headers: new axios.AxiosHeaders(),
        },
      },
    )

    expect(getNotificationErrorMessage(error, 'Fallback message')).toBe(
      'The notification could not be updated.',
    )
  })

  it('uses the fallback for an Axios error without a backend message', () => {
    const error = new axios.AxiosError('Request failed')

    expect(getNotificationErrorMessage(error, 'Fallback message')).toBe('Fallback message')
  })

  it('returns the message from a regular error', () => {
    expect(getNotificationErrorMessage(new Error('Connection failed'), 'Fallback message')).toBe(
      'Connection failed',
    )
  })

  it('returns the fallback for an unknown value', () => {
    expect(getNotificationErrorMessage(null, 'Fallback message')).toBe('Fallback message')
  })
})
