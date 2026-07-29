// Modules
import { Laptop, Moon, Sun } from 'lucide-react'

// Types
import type { ThemePreference } from '@providers/ThemeProvider'

export const themeOptions = [
  {
    value: 'system',
    label: 'System',
    description: 'Use your device appearance',
    icon: Laptop,
  },
  {
    value: 'light',
    label: 'Light',
    description: 'Always use light mode',
    icon: Sun,
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Always use dark mode',
    icon: Moon,
  },
] satisfies Array<{
  value: ThemePreference
  label: string
  description: string
  icon: typeof Laptop
}>
