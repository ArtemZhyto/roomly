export interface Register {
  name: string
  email: string
  password: string
  confirm_password: string
}

export interface Login {
  email: string
  password: string
}

export interface Payload {
  id: number
  email: string
}
