export interface CapacityOption {
  label: string
  value?: number
}

export interface CapacityFilterProps {
  value?: number
  onChange: (value?: number) => void
}
