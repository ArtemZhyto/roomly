'use client'

// Modules
import { useCallback, useState } from 'react'

interface UsePasswordVisibilityResult {
  isVisible: boolean
  toggleVisibility: () => void
  hidePassword: () => void
}

const usePasswordVisibility = (): UsePasswordVisibilityResult => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback((): void => {
    setIsVisible((currentValue) => {
      return !currentValue
    })
  }, [])

  const hidePassword = useCallback((): void => {
    setIsVisible(false)
  }, [])

  return {
    isVisible,
    toggleVisibility,
    hidePassword,
  }
}

export default usePasswordVisibility
