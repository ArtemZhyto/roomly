export const parsePositiveInteger = (value: unknown, fallback?: number): number | null => {
  const resolvedValue = value === undefined ? fallback : Number(value)

  if (resolvedValue === undefined || !Number.isInteger(resolvedValue) || resolvedValue <= 0) {
    return null
  }

  return resolvedValue
}

export const isValidPaginationLimit = (value: number): boolean => {
  return value >= 1 && value <= 50
}
