'use client'

// Modules
import { createContext } from 'react'

// Types
import type { NotificationsContextValue } from '../types/notification.types'

export const NotificationsContext = createContext<NotificationsContextValue | null>(null)
