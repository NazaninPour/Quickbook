// Shared types for the app (not data — data lives in data.ts).

export type ScreenId =
  | 'branch'
  | 'service'
  | 'therapist'
  | 'times'
  | 'review'
  | 'confirmation'
  | 'record'
  | 'schedule'
  | 'reminders'

// Which state a screen is showing. 'default' is the normal screen.
export type View = 'default' | 'empty' | 'loading' | 'error'

export const ANY_THERAPIST = 'any'

export interface Slot {
  date: string
  start: string
  therapistId: string
}

// What the customer has picked so far. It travels through the customer flow.
export interface Draft {
  branchId?: string
  savePrimary: boolean
  serviceId?: string
  length?: number
  therapistId?: string // a therapist id, or ANY_THERAPIST
  slot?: Slot
}
