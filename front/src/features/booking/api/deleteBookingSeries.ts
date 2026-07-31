// API
import apiClient from '@lib/api/api-client'

const deleteBookingSeries = async (seriesId: number): Promise<void> => {
  await apiClient.delete(`/bookings/series/${seriesId}`)
}

export default deleteBookingSeries
