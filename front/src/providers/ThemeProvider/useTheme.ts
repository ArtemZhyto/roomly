'use client'

// Modules
import { useContext } from 'react'

// Context
import { ThemeContext } from './ThemeProvider'

const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}

export default useTheme
