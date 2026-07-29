'use client'

// Modules
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

// Types
import type { ResolvedTheme, ThemeContextValue, ThemePreference } from './theme.types'

export const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
}

const STORAGE_KEY = 'roomly-theme'
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)'

const getSystemTheme = (): ResolvedTheme => {
  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? 'dark' : 'light'
}

const applyTheme = (preference: ThemePreference): ResolvedTheme => {
  const resolvedTheme = preference === 'system' ? getSystemTheme() : preference

  document.documentElement.dataset.theme = resolvedTheme
  document.documentElement.style.colorScheme = resolvedTheme

  return resolvedTheme
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemePreference>('system')

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)

    const initialTheme: ThemePreference =
      storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
        ? storedTheme
        : 'system'

    setThemeState(initialTheme)
    setResolvedTheme(applyTheme(initialTheme))
    setIsReady(true)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY)

    const handleSystemThemeChange = () => {
      if (theme !== 'system') {
        return
      }

      setResolvedTheme(applyTheme('system'))
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme])

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme)

    setThemeState(nextTheme)
    setResolvedTheme(applyTheme(nextTheme))
  }, [])

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      isReady,
      setTheme,
    }),
    [isReady, resolvedTheme, setTheme, theme],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
