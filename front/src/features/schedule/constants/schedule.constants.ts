export const OFFICE_TIMEZONE = 'Europe/Kyiv'

export const OFFICE_START_HOUR = 9
export const OFFICE_END_HOUR = 19

export const SLOT_DURATION_MINUTES = 30

export const DAYS_IN_WEEK = 7

export const SLOTS_PER_DAY = ((OFFICE_END_HOUR - OFFICE_START_HOUR) * 60) / SLOT_DURATION_MINUTES
