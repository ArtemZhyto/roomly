'use client'

// Modules
import { useEffect, useState } from 'react'

// Provider
import { useTheme } from '@providers/ThemeProvider'

// Data
import { themeOptions } from './themeOptions'

// Styles
import styles from './ThemeSwitcher.module.scss'

const ThemeSwitcher = () => {
  const { theme, isReady, setTheme } = useTheme()

  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (!isReady) {
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      setIsAnimated(true)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [isReady])

  const optionsClassName = [
    styles.options,
    isReady ? styles.optionsReady : '',
    isAnimated ? styles.optionsAnimated : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={optionsClassName}
      role='radiogroup'
      aria-label='Color theme'
      aria-busy={!isReady}
    >
      {themeOptions.map((option) => {
        const Icon = option.icon
        const isSelected = theme === option.value

        const optionClassName = [styles.option, isSelected ? styles.optionSelected : '']
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={option.value}
            type='button'
            className={optionClassName}
            role='radio'
            aria-checked={isSelected}
            disabled={!isReady}
            onClick={() => setTheme(option.value)}
          >
            <span className={styles.icon}>
              <Icon size={20} aria-hidden='true' />
            </span>

            <span className={styles.content}>
              <span className={styles.label}>{option.label}</span>

              <span className={styles.description}>{option.description}</span>
            </span>

            <span className={styles.indicator} aria-hidden='true'>
              <span />
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSwitcher
